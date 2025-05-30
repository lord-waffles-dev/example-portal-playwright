import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

/**
 * VisitsPage class.
 * This class extends BasePage and provides specific functionality for the Provider Portal website.
 */
export class VisitsPage extends BasePage {
  private readonly selectors: {
    emergencyProtocolChartButton: string;
    // Visit Page Tabs
    visitNotesTab: string;
    historyTab: string;
    medicalRecordTab: string;
    qualityTab: string;
    imagesTab: string;
    documentsTab: string;
    // Consultation Card
    consultationCard: string;
    joinVideoCallButton: string;
    switchToPhoneButton: string;
    // Patient Details Card
    patientDetailsCard: string;
    dateOfBirthField: string;
    idField: string;
    genderField: string;
    locationField: string;
    clientField: string;
    groupField: string;
    // Visit Details Card
    visitDetailsCard: string;
    referenceIdField: string;
    statusField: string;
    dateField: string;
    typeField: string;
    lengthField: string;
    // Available Services Card
    // No unique ids, xpaths, etc...

    // Visit Notes Section
    // ...
    // Visit Notes Card
    visitNotesCard: string;
    chiefComplaintField: string;
    subjectiveField: string;
    medicalRecordsReviewCheckbox: string;
    objectiveField: string;
    assessmentField: string;
    planField: string;
    additionalProviderNotesField: string;
    postVisitNotesField: string;
    // Diagnosis Card
    diagnosisCard: string;
    primaryDiagnosisDropdown: string;
    addDiagnosisButton: string;
    // CPT Codes Card
    cptCodesCard: string;
    cptCodeDropdown: string;
    // Prescriptions Card
    prescriptionsCard: string;
    addPrescriptionButton: string;
    // Pharmacy Card
    pharmacyCard: string;
    addPharmacyButton: string;
    // Referrals Card
    referralsCard: string;
    referralTypeDropdown: string;
    // Schedule Next Visit Card
    scheduleNextVisitCard: string;
    scheduleNextVisitSwitch: string;
    // Clinical Quality Review
    clinicalQualityReviewCheckbox: string;
    // Form Submission
    submitNotesButton: string;

    // History Section
    // ...
    selectVisitDropdown: string;

    // Medical Record Section
    // ...
    // Self-Completed Health Assessments Card
    selfCompletedHealthAssessmentsCard: string;
    noAssessmentsCompletedMessage: string;
    // Demographics Card
    demographicsCard: string;
    heightFtDropdown: string;
    heightInDropdown: string;
    weightDropdown: string;
    bmiValueField: string;
    smokingDropdown: string;
    alcoholDropdown: string;
    demographicsSaveButton: string;
    // Allergies Card
    allergiesCard: string;
    noAllergiesEnteredMessage: string;
    addAllergyButton: string;
    // Medications Card
    medicationsCard: string;
    noMedicationsEnteredMessage: string;
    deleteMedicationButton: string;
    addMedicationButton: string;
    // Health Problems Card
    healthProblemsCard: string;
    noHealthProblemsEnteredMessage: string;
    addHealthProblemButton: string;
    // Family History Card
    familyHistoryCard: string;
    noFamilyHistoryProvidedMessage: string;
    addFamilyHistoryButton: string;
    // Surgery History Card
    surgeryHistoryCard: string;
    noSurgeryHistoryEnteredMessage: string;
    addSurgeryHistoryButton: string;
    // Immunizations Card
    immunizationsCard: string;
    noImmunizationsEnteredMessage: string;
    addImmunizationButton: string;

    // Quality Section
    // ...
    // Blood Pressure Card
    bloodPressureCard: string;
    bloodPressureDescription: string;
    noBloodPressureResultsMessage: string;
    addBPResultButton: string;
    // Hemoglobin A1C Card
    hemoglobinCard: string;
    hemoglobinDescription: string;
    noHemoglobinResultsMessage: string;
    addHemoglobinResultButton: string;
    // Kidney Health Card
    kidneyHealthCard: string;
    kidneyHealthDescription: string;
    noKidneyHealthResultsMessage: string;
    addKidneyHealthResultButton: string;

    // Images Section
    // ...
    // Need to set up w/ Image and w/o Image

    // Documents Section
    // ...
    uploadDocumentButton: string;
    documentTable: string;
    documentTitleColumnFilter: string;
    documentTypeColumnFilter: string;
    documentDateColumnFilter: string;
    rowsPerPageDropdown: string;
    paginationLeftButton: string;
    paginationRightButton: string;
  };

  /**
   * Constructor for the VisitsPage class.
   * @param page - The Visits Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.selectors = {
      emergencyProtocolChartButton: 'xpath=//button[@data-testid=\'emergency-protocol-button\']', // data-testid="visits-page-emergency-protocol-button-select"
      // Visit Page Tabs
      visitNotesTab: 'id=visit-tab-0', // data-testid="visits-visit-notes-tab-select"
      historyTab: 'id=visit-tab-1', // data-testid="visits-history-tab-select"
      medicalRecordTab: 'id=visit-tab-2', // data-testid="visits-medical-record-tab-select"
      qualityTab: 'id=visit-tab-3', // data-testid="visits-quality-tab-select"
      imagesTab: 'id=visit-tab-4', // data-testid="visits-images-tab-select"
      documentsTab: 'id=visit-tab-5', // data-testid="visits-documents-tab-select"
      // Consultation Card
      consultationCard: 'xpath=//div[@data-testid=\'consultation-card\']', // data-testid="visits-consultation-card-container-view"
      joinVideoCallButton: 'xpath=//button[normalize-space(text())=\'Join video call\']', // data-testid="visits-consultation-card-button-video-join"
      switchToPhoneButton: 'xpath=//button[normalize-space(text())=\'Switch to phone\']', // data-testid="visits-consultation-card-button-video-join"
      // Patient Details Card
      patientDetailsCard: 'xpath=//span[normalize-space(text())=\'Patient Details\']', // data-testid="visits-patient-card-container-view"
      dateOfBirthField: 'xpath=//p[text()=\'Date of birth\']/following-sibling::p', // data-testid="visits-patient-card-dob-text-view"
      idField: 'xpath=//p[text()=\'ID\']/following-sibling::p', // data-testid="visits-patient-card-id-text-view"
      genderField: 'xpath=//p[text()=\'Gender\']/following-sibling::p', // data-testid="visits-patient-card-gender-text-view"
      locationField: 'xpath=//p[text()=\'Location\']/following-sibling::p', // data-testid="visits-patient-card-location-text-view"
      clientField: 'xpath=//p[text()=\'Client\']/following-sibling::p', // data-testid="visits-patient-card-client-text-view"
      groupField: 'xpath=//p[text()=\'Group\']/following-sibling::p', // data-testid="visits-patient-card-group-text-view"
      // Visit Details Card
      visitDetailsCard: 'xpath=//span[normalize-space(text())=\'Visit Details\']', // data-testid="visits-visit-details-card-container-view"
      referenceIdField: 'xpath=//p[text()=\'Reference ID\']/following-sibling::p', // data-testid="visits-visit-details-card-ref-id-text-view"
      statusField: 'xpath=//p[text()=\'Status\']/following-sibling::p', // data-testid="visits-visit-details-card-status-text-view"
      dateField: 'xpath=//p[text()=\'Date\']/following-sibling::p', // data-testid="visits-visit-details-card-date-text-view"
      typeField: 'xpath=//p[text()=\'Type\']/following-sibling::p', // data-testid="visits-visit-details-card-type-text-view"
      lengthField: 'xpath=//p[text()=\'Length\']/following-sibling::p', // data-testid="visits-visit-details-card-length-text-view"
      // Available Services Card
      // No unique ids, xpaths, etc...

      // Visit Notes Section
      // ...
      // Visit Notes Card
      visitNotesCard: 'xpath=//div[@data-testid=\'visit-notes-card\']', // data-testid="visits-visit-notes-card-container-view"
      chiefComplaintField: 'id=visit-notes__chief-complaint', // data-testid="visits-visit-notes-card-chief-complaint-field-input"
      subjectiveField: 'id=visit-notes__subjective', // data-testid="visits-visit-notes-card-subjective-field-input"
      medicalRecordsReviewCheckbox: 'id=medicalRecordsReview', // data-testid="visits-visit-notes-card-medical-records-review-checkbox-toggle"
      objectiveField: 'id=visit-notes__objective', // data-testid="visits-visit-notes-card-objective-field-input"
      assessmentField: 'id=visit-notes__assessment', // data-testid="visits-visit-notes-card-assessment-field-input"
      planField: 'id=visit-notes__plan', // data-testid="visits-visit-notes-card-plan-field-input"
      additionalProviderNotesField: 'id=visit-notes__additional-provider-notes', // data-testid"visits-visit-notes-card-additional-provider-notes-field-input"
      postVisitNotesField: 'id=visit-notes__post-visit-task', // data-testid="visits-visit-notes-card-post-visit-notes-field-input"
      // Diagnosis Card
      diagnosisCard: 'xpath=//div[@data-testid=\'diagnoses-card\']', // data-testid="visits-diagnosis-card-container-view"
      primaryDiagnosisDropdown: 'id=:r8o:', // data-testid="visits-diagnosis-card-primary-diagnosis-dropdown-select"
      addDiagnosisButton: 'xpath=//button[normalize-space(text())=\'Add diagnosis\']', // data-testid="visits-diagnosis-card-add-diagnosis-button-select"
      // CPT Codes Card
      cptCodesCard: 'xpath=//div[@data-testid=\'cpt-codes-card\']', // data-testid="visits-cpt-codes-card-container-view"
      cptCodeDropdown: 'id=visit-notes__cpt-code', // data-testid="visits-cpt-codes-card-cpt-code-dropdown-select"
      // Prescriptions Card
      prescriptionsCard: 'xpath=//div[@data-testid=\'prescriptions-card\']', // data-testid="visits-prescriptions-card-container-view"
      addPrescriptionButton: 'xpath=//button[normalize-space(text())=\'Add prescription\']', // data-testid="visits-prescriptions-card-add-prescription-button-select"
      // Pharmacy Card
      pharmacyCard: 'xpath=//div[@data-testid=\'pharmacy-card\']', // data-testid="visits-pharmacy-card-container-view"
      addPharmacyButton: 'xpath=//button[normalize-space(text())=\'Add pharmacy\']', // data-testid="visits-pharmacy-card-add-pharmacy-button-select"
      // Referrals Card
      referralsCard: 'xpath=//div[@data-testid=\'referral-card\']', // data-testid="visits-referrals-card-container-view"
      referralTypeDropdown: 'id=visit-notes__referral', // data-testid="visits-referrals-card-referral-type-dropdown-select"
      // Schedule Next Visit Card
      scheduleNextVisitCard: 'xpath=//div[@data-testid=\'schedule-next-visit-card\']', // data-testid="visits-schedule-next-visit-card-container-view"
      scheduleNextVisitSwitch: 'xpath=//span[@data-testid=\'schedule-next-visit-switch\']', // data-testid="visits-schedule-next-visit-card-schedule-next-visit-switch-toggle"
      // Clinical Quality Review
      clinicalQualityReviewCheckbox: 'id=clinicalQualityReview', // data-testid="visits-page-clinical-quality-review-checkbox-toggle"
      // Form Submission
      submitNotesButton: 'xpath=//button[@data-testid=\'submit-visit-notes\']', // data-testid="visits-page-submit-notes-button-select"

      // History Section
      // ...
      selectVisitDropdown: 'id=history-select', // data-testid="visits-page-select-visit-dropdown-select"

      // Medical Record Section
      // ...
      // Self-Completed Health Assessments Card
      selfCompletedHealthAssessmentsCard: 'xpath=//span[normalize-space(text())=\'Self-Completed Health Assessments\']', // data-testid="visits-self-completed-health-assessment-card-container-view"
      noAssessmentsCompletedMessage: 'xpath=//p[normalize-space(text())=\'No assessments completed\']', // data-testid="visits-self-completed-health-assessment-card-no-assessments-text-view"
      // Demographics Card
      demographicsCard: 'xpath=//h3[normalize-space(text())=\'Demographics\']', // data-testid="visits-demographics-card-container-view"
      heightFtDropdown: 'id=mui-component-select-feet', // data-testid="visits-demographics-card-height-ft-dropdown-select"
      heightInDropdown: 'id=mui-component-select-inches', // data-testid="visits-demographics-card-height-in-dropdown-select"
      weightDropdown: 'id=demographics__weight', // data-testid="visits-demographics-card-weight-dropdown-select"
      bmiValueField: 'xpath=//p[text()=\'BMI:\']/following-sibling::p', // data-testid="visits-demographics-card-bmi-text-view"
      smokingDropdown: 'id=mui-component-select-smoking', // data-testid="visits-demographics-card-smoking-dropdown-select"
      alcoholDropdown: 'id=mui-component-select-alcohol', // data-testid="visits-demographics-card-alcohol-dropdown-select"
      demographicsSaveButton: 'xpath=//button[normalize-space(text())=\'Save\']', // data-testid="visits-demographics-card-save-button-select"
      // Allergies Card
      allergiesCard: 'xpath=//h3[normalize-space(text())=\'Allergies\']', // data-testid="visits-allergies-card-container-view"
      noAllergiesEnteredMessage: 'xpath=//p[normalize-space(text())=\'No allergies entered\']', // data-testid="visits-allergies-card-no-allergies-text-view"
      addAllergyButton: 'xpath=//button[normalize-space(text())=\'Add allergy\']', // data-testid="visits-allergies-card-add-allergy-button-select"
      // Medications Card
      medicationsCard: 'xpath=//h3[normalize-space(text())=\'Medications\']', // data-testid="visits-medications-card-container-view"
      noMedicationsEnteredMessage: 'xpath=//p[normalize-space(text())=\'No medications entered\']', // data-testid="visits-medications-card-no-medications-text-view"
      deleteMedicationButton: 'xpath=//button[@aria-label=\'Delete\']', // data-testid="visits-medications-card-delete-medication-button-#-select" // # could be row number
      addMedicationButton: 'xpath=//button[normalize-space(text())=\'Add medication\']', // data-testid="visits-medications-card-add-medication-button-select"
      // Health Problems Card
      healthProblemsCard: 'xpath=//h3[normalize-space(text())=\'Health Problems\']', // data-testid="visits-health-problems-card-container-view"
      noHealthProblemsEnteredMessage: 'xpath=//p[normalize-space(text())=\'No health problems entered\']', // data-testid="visits-health-problems-card-no-health-problems-text-view"
      addHealthProblemButton: 'xpath=//button[normalize-space(text())=\'Add health problem\']', // data-testid="visits-health-problems-card-add-health-problem-button-select"
      // Family History Card
      familyHistoryCard: 'xpath=//h3[normalize-space(text())=\'Family History\']', // data-testid="visits-family-history-card-container-view"
      noFamilyHistoryProvidedMessage: 'xpath=//p[normalize-space(text())=\'No family history provided.\']', // data-testid="visits-family-history-card-no-family-history-text-view"
      addFamilyHistoryButton: 'xpath=//button[normalize-space(text())=\'Add family history\']', // data-testid="visits-family-history-card-add-family-history-button-select"
      // Surgery History Card
      surgeryHistoryCard: 'xpath=//h3[normalize-space(text())=\'Surgery History\']', // data-testid="visits-surgery-history-card-container-view"
      noSurgeryHistoryEnteredMessage: 'xpath=//p[normalize-space(text())=\'No surgery history entered\']', // data-testid="visits-surgery-history-card-no-surgery-history-text-view"
      addSurgeryHistoryButton: 'xpath=//button[normalize-space(text())=\'Add surgery history\']', // data-testid="visits-surgery-history-card-add-surgery-history-button-select"
      // Immunizations Card
      immunizationsCard: 'xpath=//h3[normalize-space(text())=\'Immunizations\']', // data-testid="visits-immunizations-card-container-view"
      noImmunizationsEnteredMessage: 'xpath=//p[normalize-space(text())=\'No immunizations entered\']', // data-testid="visits-immunizations-card-no-immunizations-text-view"
      addImmunizationButton: 'xpath=//button[normalize-space(text())=\'Add immunization\']', // data-testid="visits-immunizations-card-add-immunizations-button-select"

      // Quality Section
      // ...
      // Blood Pressure Card
      bloodPressureCard: 'xpath=//div[@data-testid=\'quality-card-bp\']', // data-testid="visits-blood-pressure-card-container-view"
      bloodPressureDescription: 'xpath=//p[normalize-space(text())=\'Measure adults between 18-85 years when medically necessary (e.g., diagnosis or management of hypertension, management of diabetes, prescribing certain medications) for adequate control (<140/80 mmHg)\']',
      // data-testid="visits-blood-pressure-card-blood-pressure-description-text-view"
      noBloodPressureResultsMessage: 'xpath=//p[normalize-space(text())=\'No blood pressure results\']', // data-testid="visits-blood-pressure-card-no-blood-pressure-text-view"
      addBPResultButton: 'xpath=(//button[@data-testid=\'add-result-button\'])[1]', // data-testid="visits-blood-pressure-card-add-blood-pressure-result-button-select"
      // Hemoglobin A1C Card
      hemoglobinCard: 'xpath=//div[@data-testid=\'quality-card-hemoglobin\']', // data-testid="visits-hemoglobin-card-container-view"
      hemoglobinDescription: 'xpath=//p[normalize-space(text())=\'Measure adults between 18-75 years with Type 1 or Type 2 diabetes for adequate control (<8%) and poor control (>9%)\']', // data-testid="visits-hemoglobin-card-hemoglobin-description-text-view"
      noHemoglobinResultsMessage: 'xpath=//p[normalize-space(text())=\'No hemoglobin A1C results\']', // data-testid="visits-hemoglobin-card-no-hemoglobin-result-text-view"
      addHemoglobinResultButton: 'xpath=(//button[@data-testid=\'add-result-button\'])[2]', // data-testid="visits-hemoglobin-card-add-hemoglobin-result-button-select"
      // Kidney Health Card
      kidneyHealthCard: 'xpath=//div[@data-testid=\'quality-card-kidney\']', // data-testid="visits-kidney-health-card-container-view"
      kidneyHealthDescription: 'xpath=//p[normalize-space(text())=\'Complete an annual kidney health evaluation for adults between 18-85 years with Type 1 or Type 2 diabetes, including a blood test for kidney function (eGFR) and a urine test for kidney damage (uACR)\']',
      // data-testid="visits-kidney-health-card-kidney-health-description-text-view"
      noKidneyHealthResultsMessage: 'xpath=//p[normalize-space(text())=\'No kidney health results\']', // data-testid="visits-kidney-health-card-no-kidney-health-text-view"
      addKidneyHealthResultButton: 'xpath=(//button[@data-testid=\'add-result-button\'])[3]', // data-testid="visits-kidney-health-card-add-kidney-health-result-button-select"

      // Images Section
      // ...
      // Need to set up w/ Image and w/o Image

      // Documents Section
      // ...
      uploadDocumentButton: 'xpath=//button[@data-testid=\'document-upload-button\']', // data-testid="visits-documents-upload-document-button-select"
      documentTable: 'xpath=//button[text()=\'Upload document\']/following-sibling::div', // data-testid="visits-documents-document-table-container-view"
      documentTitleColumnFilter: 'xpath=//div[normalize-space(text())=\'Document Title\']', // data-testid="visits-documents-document-title-column-filter-select"
      documentTypeColumnFilter: 'xpath=//div[normalize-space(text())=\'Document Type\']', // data-testid="visits-documents-document-type-column-filter-select"
      documentDateColumnFilter: 'xpath=//div[normalize-space(text())=\'Date Uploaded\']', // data-testid="visits-documents-document-date-column-filter-select"
      rowsPerPageDropdown: 'id=:rdn:', // data-testid="visits-documents-rows-per-page-dropdown-select"
      paginationLeftButton: 'xpath=(//button[@aria-label=\'Go to previous page\'])[2]', // data-testid="visits-documents-previous-page-button-select"
      paginationRightButton: 'xpath=(//button[@aria-label=\'Go to next page\'])[2]', // data-testid="visits-documents-next-page-button-select"
      ...customSelectors
    };
  }

  /**
   * Verify the Visits Page is present upon redirection from the Dashboard screen.
   */
  async verifyVisitsPage(): Promise<void> {
    await this.waitForElement(this.selectors.visitNotesTab); // update to dashboard element
  }

  /**
   * Verify the Patient Details Card is present on the Visit screen.
   */
  async viewPatientDetailsCard(): Promise<void> {
    await this.waitForElement(this.selectors.patientDetailsCard);
    // Scroll to make sure it's in view
    await this.page.locator(this.selectors.patientDetailsCard).scrollIntoViewIfNeeded();
  }

  /**
   * Verify the Patient Details Card information matches expected.
   */
  // Add this method to the VisitsPage class
  async verifyPatientInformation(expectedValues: { 'Field': string; 'Expected Value': string }[]): Promise<void> {
    for (const row of expectedValues) {
      const field = row.Field;
      const expectedValue = row['Expected Value'];
      let actualValue;

      // Get the actual value based on the field name
      switch (field) {
        case 'Date of birth':
          actualValue = await this.page.locator(this.selectors.dateOfBirthField).textContent();
          break;
        case 'ID':
          actualValue = await this.page.locator(this.selectors.idField).textContent();
          break;
        case 'Gender':
          actualValue = await this.page.locator(this.selectors.genderField).textContent();
          break;
        case 'Location':
          actualValue = await this.page.locator(this.selectors.locationField).textContent();
          break;
        case 'Client':
          actualValue = await this.page.locator(this.selectors.clientField).textContent();
          break;
        case 'Group':
          actualValue = await this.page.locator(this.selectors.groupField).textContent();
          break;
        default:
          throw new Error(`Unknown field: ${field}`);
      }

      // Trim whitespace from the actual value
      actualValue = actualValue?.trim();

      // Assert that the actual value matches the expected value
      if (actualValue !== expectedValue) {
        throw new Error(`Expected ${field} to be "${expectedValue}" but got "${actualValue}"`);
      }
    }
  }
}
