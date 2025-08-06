import { Given, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../../support/custom-world';
import { ApiClient } from '../../utils/apiClient';
import {
  ConsultationRequest,
  ConsultationApiResponse,
  VisitHistoryResponse,
  VisitHistoryResult,
  VisitHistoryApiResponse
} from '../../models/api/consultation.model';
import { config } from '../../support/config';
import { generateRandomFutureDates } from '../../utils/dateUtils';
import { getConfigValue } from '../../utils/configUtils';
import { logApiCall } from '../../utils/networkCapture';

Given('I check for existing consults for provider {string}', async function (
  this: ICustomWorld,
  provider: string
) {
  // Create API client and set authentication token
  const apiClient = new ApiClient(this.server!);
  apiClient.setAuthToken(process.env.STAGING_BEARER_TOKEN ?? '');

  // defaults to autoProvider1
  const providerID = getConfigValue(config.credentials.staging, provider, 'providerID', 4161224);

  // Construct the visit history endpoint
  const apiEndpoint = `${config.VISIT_API_URL.replace(/\/$/, '')}/api/v3/Consultation/VisitHistory`;

  // Set query parameters
  const params = {
    PageNumber: 1,
    RowsPerPage: 50,
    SortColumn: 'ScheduleDate',
    SortDirection: 'DESC',
    ListOfStatusIds: [1, 7, 14], // 1 = Scheduled, 7 = Assigned, 14 = Pending Provider Confirmation
    ProviderID: providerID
  };

  // Log the API call
  const headers = {
    Accept: 'text/plain',
    Authorization: `Bearer ${process.env.STAGING_BEARER_TOKEN}`
  };
  logApiCall('GET', apiEndpoint, headers, params);

  // Create a URLSearchParams object for the actual API call
  const searchParams = new URLSearchParams();
  // Add regular parameters
  searchParams.append('PageNumber', params.PageNumber.toString());
  searchParams.append('RowsPerPage', params.RowsPerPage.toString());
  searchParams.append('SortColumn', params.SortColumn);
  searchParams.append('SortDirection', params.SortDirection);
  searchParams.append('ProviderID', params.ProviderID.toString());
  // Add array parameters as multiple entries with the same key
  params.ListOfStatusIds.forEach((id) => {
    searchParams.append('ListOfStatusIds', id.toString());
  });

  // Make the request with URLSearchParams instead of the original params object
  const response = await this.server!.get(`${apiEndpoint}?${searchParams.toString()}`, {
    headers
  });

  // Log the response status and body for debugging
  console.log('Response status:', response.status());
  const responseBody = await response.text();
  console.log('Response body:', responseBody);

  if (response.status() !== 200) {
    throw new Error(`Failed to get visit history: ${response.statusText()}`);
  }

  // Parse the response
  const apiResponse = JSON.parse(responseBody) as VisitHistoryApiResponse;

  // Transform the API response to match the expected VisitHistoryResponse interface
  const visitHistory: VisitHistoryResponse = {
    totalCount: apiResponse.count,
    items: apiResponse.visitHistoryResults.map((result: VisitHistoryResult) => ({
      id: result.consultationID.toString(),
      scheduleDate: result.scheduleDate,
      status: {
        id: result.consultationStatus,
        name: result.consultationStatusDesc
      }
    }))
  };

  // Store the transformed response in the world object
  this.visitHistory = visitHistory;

  console.log(`Found ${visitHistory.totalCount} existing consults for provider ${provider}`);

  // You can add additional logic here to handle the existing consults
  if (visitHistory.totalCount > 0) {
    console.log('Existing consults:', visitHistory.items.map(item => ({
      id: item.id,
      scheduleDate: item.scheduleDate,
      status: item.status.name
    })));
  }
});

Given('I cancel all existing consults for provider {string}', async function (
  this: ICustomWorld,
  provider: string
) {
  // Check if we have visit history data
  if (!this.visitHistory?.items?.length) {
    console.log(`No existing consults to cancel for provider ${provider}`);
    return;
  }

  console.log(`Attempting to cancel ${this.visitHistory.items.length} existing consults for provider ${provider}`);

  // Iterate through each consult and cancel it
  for (const consult of this.visitHistory.items) {
    // Construct the endpoint for updating consult status
    const apiEndpoint = `${config.VISIT_API_URL.replace(/\/$/, '')}/api/v1/Consultation/${consult.id}/status`;

    // Set query parameters
    const params = {
      cancelledReasonID: 'null',
      cancelledReasonDescription: 'null',
      skipRefundTrigger: false
    };

    // Request body for cancellation
    const data = {
      statusID: 9 // Status ID 9 = Closed Status, Status ID 4 = Canceled Status
    };

    console.log(`Cancelling consult with ID: ${consult.id}`);

    // Extract headers into a variable
    const headers = {
      'Content-Type': 'application/json-patch+json',
      'Accept': '*/*',
      'Authorization': `Bearer ${process.env.STAGING_BEARER_TOKEN}`
    };

    // Log the API call
    logApiCall('PUT', apiEndpoint, headers, params, data);

    try {
      // Make the PUT request
      const response = await this.server!.put(apiEndpoint, {
        params,
        data,
        headers
      });

      // Log the response status
      console.log(`Cancel response status for consult ${consult.id}:`, response.status());

      // Check if the request was successful
      if (response.status() !== 200 && response.status() !== 204) {
        const responseBody = await response.text();
        console.error(`Failed to cancel consult ${consult.id}:`, responseBody);
      } else {
        console.log(`Successfully cancelled consult ${consult.id}`);
      }
    } catch (error) {
      console.error(`Error cancelling consult ${consult.id}:`, error);
    }
  }

  console.log('Finished processing all consults');
});

Given('I create a {string} {string} consult for {string} with {string}', async function (
  this: ICustomWorld,
  mediaType: string,
  consultType: string,
  member: string,
  provider: string
) {
  // Create API client and set authentication token
  const apiClient = new ApiClient(this.server!);
  apiClient.setAuthToken(process.env.STAGING_BEARER_TOKEN ?? '');

  const requestedScheduleDates = generateRandomFutureDates(3);

  // Defaults to Auto1 Member, vpc-initial video consult, with Auto1 Provider
  const consultationRequest: ConsultationRequest = {
    memberID: getConfigValue(config.credentials.staging, member, 'memberID', 271658634),
    consultType: getConfigValue(config.consultType, consultType, null, 1123),
    providerID: getConfigValue(config.credentials.staging, provider, 'providerID', 4161224),
    mediaType: getConfigValue(config.mediaType, mediaType, null, 2),
    contactAddress: '+16122367210',
    requestedScheduleDates,
    subject: `Dev-Testing ${consultType.toUpperCase()} Consultation`,
    pharmacyID: 'pharm_63018c4e7a36eb119fb400155dfc253f',
    state: 'TX',
    shared: true
  };

  const apiEndpoint = `${config.VISIT_API_URL.replace(/\/$/, '')}/api/v4/Consultation`;

  // Extract headers into a variable
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.STAGING_BEARER_TOKEN}`
  };

  // Log the API call
  logApiCall('POST', apiEndpoint, headers, undefined, consultationRequest);

  // Make the request
  const response = await this.server!.post(apiEndpoint, {
    data: consultationRequest,
    headers,
    timeout: 60000
  });

  // Log the response status and body for debugging
  console.log('Response status:', response.status());
  const responseBody = await response.text();
  console.log('Response body:', responseBody);

  if (response.status() !== 200 && response.status() !== 201) {
    throw new Error(`Failed to create consultation: ${response.statusText()}`);
  }

  try {
    // Parse the response body
    const rawResponse = JSON.parse(responseBody) as ConsultationApiResponse;

    // Log the full parsed response for debugging
    console.log('Parsed response:', JSON.stringify(rawResponse, null, 2));

    // Check if the response has a consultationID property
    if (!rawResponse.consultationID) {
      console.error('API response is missing the consultationID property:', rawResponse);
      this.consultationData = undefined;
    } else {
      // Directly assign the transformed response to consultationData
      this.consultationData = {
        id: rawResponse.consultationID.toString()
      };
      console.log('Successfully created consultation with ID:', this.consultationData.id);
    }
  } catch (error) {
    console.error('Error parsing consultation response:', error);
    console.error('Raw response body:', responseBody);
    this.consultationData = undefined;
  }
});

Then('the consultation should be created successfully', function (this: ICustomWorld) {
  if (!this.consultationData?.id) {
    throw new Error('Consultation was not created successfully');
  }
  console.log('Consultation created with ID:', this.consultationData?.id);
});
