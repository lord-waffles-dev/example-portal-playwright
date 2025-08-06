export interface RequestedScheduleDate {
  requestedDateTime: string;
  priority: number;
}

export interface ConsultationRequest {
  memberID: number;
  consultType: number;
  providerID: number;
  mediaType: number;
  contactAddress: string;
  requestedScheduleDates: RequestedScheduleDate[];
  subject: string;
  pharmacyID: string;
  state: string;
  shared: boolean;
  [key: string]: unknown;
}

export interface ConsultationResponse {
  id: string;
  consultationID?: number;
}

export interface ConsultationApiResponse {
  consultationID: number;
  memberID: number;
  provider: {
    providerID: number;
    firstName: string;
    lastName: string;
  };
}

export interface VisitHistoryResponse {
  items: {
    id: string;
    scheduleDate: string;
    status: {
      id: number;
      name: string;
    };
  }[];
  totalCount: number;
}

export interface VisitHistoryResult {
  consultationID: number;
  scheduleDate: string;
  consultationStatus: number;
  consultationStatusDesc: string;
}

export interface VisitHistoryApiResponse {
  count: number;
  visitHistoryResults: VisitHistoryResult[];
}
