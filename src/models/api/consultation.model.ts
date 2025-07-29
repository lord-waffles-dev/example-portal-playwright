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
}

export interface ConsultationResponse {
  id: string;
}
