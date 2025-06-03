import { Locator, Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

/**
 * VisitsPage class.
 * This class extends BasePage and provides specific functionality for the Provider Portal website.
 */
export class VisitsPage extends BasePage {
  readonly page: Page;
  readonly emergencyProtocolChartButton: Locator;
  // Visit Page Tabs
  readonly visitNotesTab: Locator;
  readonly historyTab: Locator;
  readonly medicalRecordTab: Locator;
  readonly qualityTab: Locator;
  readonly imagesTab: Locator;
  readonly documentsTab: Locator;
  // Consultation Card
  readonly consultationCard: Locator;
  readonly joinVideoCallButton: Locator;
  readonly switchToPhoneButton: Locator;
  // Patient Details Card
  readonly patientDetailsCard: Locator;
  readonly dateOfBirthField: Locator;
  readonly idField: Locator;
  readonly genderField: Locator;
  readonly locationField: Locator;
  readonly clientField: Locator;
  readonly groupField: Locator;
  // Visit Details Card
  readonly visitDetailsCard: Locator;
  readonly referenceIdField: Locator;
  readonly statusField: Locator;
  readonly dateField: Locator;
  readonly typeField: Locator;
  readonly lengthField: Locator;
  // Available Services Card
  // No unique ids, xpaths, etc...

  // Visit Notes Section
  // ...
  // Visit Notes Card
  readonly visitNotesCard: Locator;
  readonly chiefComplaintField: Locator;
  readonly subjectiveField: Locator;
  readonly medicalRecordsReviewCheckbox: Locator;
  readonly objectiveField: Locator;
  readonly assessmentField: Locator;
  readonly planField: Locator;
  readonly additionalProviderNotesField: Locator;
  readonly postVisitNotesField: Locator;
  // Diagnoses Card
  readonly diagnosesCard: Locator;
  readonly primaryDiagnosesDropdown: Locator;
  readonly addDiagnosesButton: Locator;
  // CPT Codes Card
  readonly cptCodesCard: Locator;
  readonly cptCodeDropdown: Locator;
  // Prescriptions Card
  readonly prescriptionsCard: Locator;
  readonly addPrescriptionButton: Locator;
  // Pharmacy Card
  readonly pharmacyCard: Locator;
  readonly addPharmacyButton: Locator;
  // Referrals Card
  readonly referralsCard: Locator;
  readonly referralTypeDropdown: Locator;
  // Schedule Next Visit Card
  readonly scheduleNextVisitCard: Locator;
  readonly scheduleNextVisitSwitch: Locator;
  // Clinical Quality Review
  readonly clinicalQualityReviewCheckbox: Locator;
  // Form Submission
  readonly submitNotesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.emergencyProtocolChartButton = page.getByTestId('emergency-protocol-button'); // data-testid="visits-page-emergency-protocol-button-select"
    // Visit Page Tabs
    this.visitNotesTab = page.locator('#visit-tab-0'); // data-testid="visits-visit-notes-tab-select"
    this.historyTab = page.locator('#visit-tab-1'); // data-testid="visits-history-tab-select"
    this.medicalRecordTab = page.locator('#visit-tab-2'); // data-testid="visits-medical-record-tab-select"
    this.qualityTab = page.locator('#visit-tab-3'); // data-testid="visits-quality-tab-select"
    this.imagesTab = page.locator('#visit-tab-4'); // data-testid="visits-images-tab-select"
    this.documentsTab = page.locator('#visit-tab-5'); // data-testid="visits-documents-tab-select"
    // Consultation Card
    this.consultationCard = page.getByTestId('consultation-card'); // data-testid="visits-consultation-card-container-view"
    this.joinVideoCallButton = page.getByRole('button', { name: 'Join video call' }); // data-testid="visits-consultation-card-button-video-join"
    this.switchToPhoneButton = page.getByRole('button', { name: 'Switch to phone' }); // data-testid="visits-consultation-card-button-video-join"
    // Patient Details Card
    this.patientDetailsCard = page.getByText('Patient Details'); // data-testid="visits-patient-card-container-view"
    this.dateOfBirthField = page.locator('//p[text()=\'Date of birth\']/following-sibling::p'); // data-testid="visits-patient-card-dob-text-view"
    this.idField = page.locator('//p[text()=\'ID\']/following-sibling::p'); // data-testid="visits-patient-card-id-text-view"
    this.genderField = page.locator('//p[text()=\'Gender\']/following-sibling::p'); // data-testid="visits-patient-card-gender-text-view"
    this.locationField = page.locator('//p[text()=\'Location\']/following-sibling::p'); // data-testid="visits-patient-card-location-text-view"
    this.clientField = page.locator('//p[text()=\'Client\']/following-sibling::p'); // data-testid="visits-patient-card-client-text-view"
    this.groupField = page.locator('//p[text()=\'Group\']/following-sibling::p'); // data-testid="visits-patient-card-group-text-view"
    // Visit Details Card
    this.visitDetailsCard = page.getByText('Visit Details'); // data-testid="visits-visit-details-card-container-view"
    this.referenceIdField = page.locator('//p[text()=\'Reference ID\']/following-sibling::p'); // data-testid="visits-visit-details-card-ref-id-text-view"
    this.statusField = page.locator('//p[text()=\'Status\']/following-sibling::p'); // data-testid="visits-visit-details-card-status-text-view"
    this.dateField = page.locator('//p[text()=\'Date\']/following-sibling::p'); // data-testid="visits-visit-details-card-date-text-view"
    this.typeField = page.locator('//p[text()=\'Type\']/following-sibling::p'); // data-testid="visits-visit-details-card-type-text-view"
    this.lengthField = page.locator('//p[text()=\'Length\']/following-sibling::p'); // data-testid="visits-visit-details-card-length-text-view"
    // Available Services Card
    // No unique ids, xpaths, etc...

    // Visit Notes Section
    // ...
    // Visit Notes Card
    this.visitNotesCard = page.getByTestId('visit-notes-card'); // data-testid="visits-visit-notes-card-container-view"
    this.chiefComplaintField = page.locator('#visit-notes__chief-complaint'); // data-testid="visits-visit-notes-card-chief-complaint-field-input"
    this.subjectiveField = page.locator('#visit-notes__subjective'); // data-testid="visits-visit-notes-card-subjective-field-input"
    this.medicalRecordsReviewCheckbox = page.getByRole('checkbox', { name: 'I have reviewed the patient’s' }); // data-testid="visits-visit-notes-card-medical-records-review-checkbox-toggle"
    this.objectiveField = page.locator('#visit-notes__objective'); // data-testid="visits-visit-notes-card-objective-field-input"
    this.assessmentField = page.locator('#visit-notes__assessment'); // data-testid="visits-visit-notes-card-assessment-field-input"
    this.planField = page.locator('#visit-notes__plan'); // data-testid="visits-visit-notes-card-plan-field-input"
    this.additionalProviderNotesField = page.locator('#visit-notes__additional-provider-notes'); // data-testid"visits-visit-notes-card-additional-provider-notes-field-input"
    this.postVisitNotesField = page.locator('#visit-notes__post-visit-task'); // data-testid="visits-visit-notes-card-post-visit-notes-field-input"
    // Diagnosis Card
    this.diagnosesCard = page.getByTestId('diagnoses-card'); // data-testid="visits-diagnosis-card-container-view"
    this.primaryDiagnosesDropdown = page.locator('(//div[@name=\'noteDetails[0]\'])[1]'); // data-testid="visits-diagnosis-card-primary-diagnosis-dropdown-select"
    this.addDiagnosesButton = page.locator('//button[normalize-space(text())=\'Add diagnosis\']'); // data-testid="visits-diagnosis-card-add-diagnosis-button-select"
    // CPT Codes Card
    this.cptCodesCard = page.getByTestId('cpt-codes-card'); // data-testid="visits-cpt-codes-card-container-view"
    this.cptCodeDropdown = page.locator('#visit-notes__cpt-code'); // data-testid="visits-cpt-codes-card-cpt-code-dropdown-select"
    // Prescriptions Card
    this.prescriptionsCard = page.getByTestId('prescriptions-card'); // data-testid="visits-prescriptions-card-container-view"
    this.addPrescriptionButton = page.locator('//button[normalize-space(text())=\'Add prescription\']'); // data-testid="visits-prescriptions-card-add-prescription-button-select"
    // Pharmacy Card
    this.pharmacyCard = page.getByTestId('pharmacy-card'); // data-testid="visits-pharmacy-card-container-view"
    this.addPharmacyButton = page.locator('//button[normalize-space(text())=\'Add pharmacy\']'); // data-testid="visits-pharmacy-card-add-pharmacy-button-select"
    // Referrals Card
    this.referralsCard = page.getByTestId('referral-card'); // data-testid="visits-referrals-card-container-view"
    this.referralTypeDropdown = page.locator('#visit-notes__referral'); // data-testid="visits-referrals-card-referral-type-dropdown-select"
    // Schedule Next Visit Card
    this.scheduleNextVisitCard = page.getByTestId('schedule-next-visit-card'); // data-testid="visits-schedule-next-visit-card-container-view"
    this.scheduleNextVisitSwitch = page.getByTestId('schedule-next-visit-switch'); // data-testid="visits-schedule-next-visit-card-schedule-next-visit-switch-toggle"
    // Clinical Quality Review
    this.clinicalQualityReviewCheckbox = page.getByTestId('CheckBoxOutlineBlankIcon'); // data-testid="visits-page-clinical-quality-review-checkbox-toggle"
    // Form Submission
    this.submitNotesButton = page.getByTestId('submit-visit-notes'); // data-testid="visits-page-submit-notes-button-select"
  }

  async verifyVisitsPage(): Promise<void> {
    await this.visitNotesTab.waitFor();
  }

  async viewPatientDetailsCard(): Promise<void> {
    await this.patientDetailsCard.waitFor();
    await this.patientDetailsCard.scrollIntoViewIfNeeded();
  }

  async viewVisitDetailsCard(): Promise<void> {
    await this.visitDetailsCard.waitFor();
    await this.visitDetailsCard.scrollIntoViewIfNeeded();
  }

  async selectVisitPageTabs(tab: string): Promise<void> {
    const tabMap: Record<string, Locator> = {
      'Visit Notes': this.visitNotesTab,
      'History': this.historyTab,
      'Medical Record': this.medicalRecordTab,
      'Quality': this.qualityTab,
      'Images': this.imagesTab,
      'Documents': this.documentsTab
    };

    const locator = tabMap[tab];
    if (locator) {
      await locator.click();
    } else {
      throw new Error(`Unknown Tab: ${tab}`);
    }
  }

  async checkVisitsPageCheckboxes(checkbox: string): Promise<void> {
    const tabMap: Record<string, Locator> = {
      'Medical Records Review': this.medicalRecordsReviewCheckbox,
      'Clinical Quality Review': this.clinicalQualityReviewCheckbox
    };

    const locator = tabMap[checkbox];
    if (locator) {
      await locator.click();
    } else {
      throw new Error(`Unknown Checkbox: ${checkbox}`);
    }
  }

  async viewVisitPageCards(tab: string): Promise<void> {
    const tabMap: Record<string, Locator> = {
      'Visit Notes': this.visitNotesCard,
      'Diagnoses': this.diagnosesCard,
      'CPT Code': this.cptCodesCard,
      'Prescriptions': this.prescriptionsCard,
      'Pharmacy': this.pharmacyCard,
      'Referrals': this.referralsCard,
      'Schedule Next Visit': this.scheduleNextVisitCard
    };

    const locator = tabMap[tab];
    if (locator) {
      await locator.click();
    } else {
      throw new Error(`Unknown Tab: ${tab}`);
    }
  }

  async interactWithVisitNotesFields(field: string, options?: { visible?: boolean; checkText?: string; fillText?: string; select?: boolean }, inputText?: string): Promise<void> {
    const tabMap: Record<string, Locator> = {
      'Chief Complaint': this.chiefComplaintField,
      'Subjective': this.subjectiveField,
      'Objective': this.objectiveField,
      'Assessment': this.assessmentField,
      'Plan': this.planField,
      'Additional Provider Notes': this.additionalProviderNotesField,
      'Post Visit Notes': this.postVisitNotesField
    };

    const locator = tabMap[field];
    if (!locator) {
      throw new Error(`Unknown Field: ${field}`);
    }

    if (options?.visible) {
      const isVisible = await locator.isVisible();
      if (!isVisible) {
        throw new Error(`Field "${field}" is not visible`);
      }
    }

    if (options?.checkText) {
      const selector = await locator.textContent();
      if (!text || !selector.includes(field)) {
        throw new Error(`Field text does not match expected: "${inputText}"`);
      }
    }

    if (options?.fillText) {
      if (inputText != null) {
        await locator.fill(inputText);
      }
      const updatedText = await locator.textContent();
      if (!inputText || !updatedText.includes(inputText)) {
        throw new Error(`Field was not filled correctly with: "${inputText}"`);
      }
    }

    if (options?.select) {
      const clickField = await locator.click();
      if (!clickField) {
        throw new Error(`Unable to click on field: "${field}"`);
      }
    }
  }

  async verifyPatientInformation(expectedValues: { 'Field': string; 'Expected Value': string }[]): Promise<void> {
    for (const row of expectedValues) {
      const field = row.Field;
      const expectedValue = row['Expected Value'];
      let actualValue;

      switch (field) {
        case 'Date of birth':
          actualValue = await this.dateOfBirthField.textContent();
          break;
        case 'ID':
          actualValue = await this.idField.textContent();
          break;
        case 'Gender':
          actualValue = await this.genderField.textContent();
          break;
        case 'Location':
          actualValue = await this.locationField.textContent();
          break;
        case 'Client':
          actualValue = await this.clientField.textContent();
          break;
        case 'Group':
          actualValue = await this.groupField.textContent();
          break;
        default:
          throw new Error(`Unknown field: ${field}`);
      }

      actualValue = actualValue?.trim();

      if (actualValue !== expectedValue) {
        throw new Error(`Expected ${field} to be "${expectedValue}" but got "${actualValue}"`);
      }
    }
  }

  async verifyVisitInformation(expectedValues: { 'Field': string; 'Expected Value': string }[]): Promise<void> {
    for (const row of expectedValues) {
      const field = row.Field;
      const expectedValue = row['Expected Value'];
      let actualValue;

      switch (field) {
        case 'Reference ID':
          actualValue = await this.referenceIdField.textContent();
          break;
        case 'Status':
          actualValue = await this.statusField.textContent();
          break;
        case 'Date':
          actualValue = await this.dateField.textContent();
          break;
        case 'Type':
          actualValue = await this.typeField.textContent();
          break;
        case 'Length':
          actualValue = await this.lengthField.textContent();
          break;
        default:
          throw new Error(`Unknown field: ${field}`);
      }

      // Trim whitespace from the actual value
      actualValue = actualValue?.trim();

      if (actualValue !== expectedValue) {
        throw new Error(`Expected ${field} to be "${expectedValue}" but got "${actualValue}"`);
      }
    }
  }
}
