import { Given, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../../support/custom-world';
import { ApiClient } from '../../utils/apiClient';
import { ConsultationRequest, ConsultationResponse } from '../../models/api/consultation.model';
import { config } from '../../support/config';

Given('I create a {string} {string} consult for {string} with {string}', async function (
  this: ICustomWorld,
  mediaType: string,
  consultType: string,
  member: string,
  provider: string
) {
  // Create API client and set authentication token
  const apiClient = new ApiClient(this.server!);
  apiClient.setAuthToken(config.staging_token);

  const requestedScheduleDates = [
    {
      requestedDateTime: new Date(Date.now() + 432000000).toISOString(), // 5 days from now
      priority: 1
    },
    {
      requestedDateTime: new Date(Date.now() + 518400000).toISOString(), // 6 days from now
      priority: 2
    },
    {
      requestedDateTime: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
      priority: 3
    }
  ];

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

  // Helper function to safely get values from config objects
  function getConfigValue<T extends object>(
    obj: T,
    key: string,
    subKey: string | null = null,
    defaultValue: number
  ): number {
    try {
      if (key in obj) {
        const typedKey = key as keyof T;

        if (subKey) {
          const value = (obj[typedKey] as Record<string, unknown>)?.[subKey];
          return (typeof value === 'string' || typeof value === 'number')
            ? parseInt(String(value))
            : defaultValue;
        }

        // Direct property access
        return typeof obj[typedKey] === 'string' ? parseInt(obj[typedKey] as unknown as string) : defaultValue;
      }
      return defaultValue;
    } catch (error) {
      console.warn(`Error accessing config value for ${key}${subKey ? '.' + subKey : ''}, using default:`, error, defaultValue);
      return defaultValue;
    }
  }

  const apiEndpoint = `${config.VISIT_API_URL.replace(/\/$/, '')}/api/v4/Consultation`;
  const response = await this.server!.post(apiEndpoint, {
    data: consultationRequest,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.staging_token}`
    },
    timeout: 60000
  });

  if (response.status() !== 200 && response.status() !== 201) {
    throw new Error(`Failed to create consultation: ${response.statusText()}`);
  }

  this.consultationData = await response.json() as ConsultationResponse;
  console.log('Successfully created consultation with ID:', this.consultationData?.id);
});

Then('the consultation should be created successfully', function (this: ICustomWorld) {
  if (!this.consultationData?.id) {
    throw new Error('Consultation was not created successfully');
  }
  console.log('Consultation created with ID:', this.consultationData?.id);
});
