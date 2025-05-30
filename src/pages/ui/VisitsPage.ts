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
    // Need to setup w/ Image and w/o Image

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
      emergencyProtocolChartButton: '//button[@data-testid=\'emergency-protocol-button\']',
      // Visit Page Tabs
      visitNotesTab: 'visit-tab-0',
      historyTab: 'visit-tab-1',
      medicalRecordTab: 'visit-tab-2',
      qualityTab: 'visit-tab-3',
      imagesTab: 'visit-tab-4',
      documentsTab: 'visit-tab-5',
      // Consultation Card
      consultationCard: '//div[@data-testid=\'consultation-card\']',
      joinVideoCallButton: '//button[normalize-space(text())=\'Join video call\']',
      switchToPhoneButton: '//button[normalize-space(text())=\'Switch to phone\']',
      // Patient Details Card
      patientDetailsCard: '//span[normalize-space(text())=\'Patient Details\']',
      dateOfBirthField: '//p[text()=\'Date of birth\']/following-sibling::p',
      idField: '//p[text()=\'ID\']/following-sibling::p',
      genderField: '//p[text()=\'Gender\']/following-sibling::p',
      locationField: '//p[text()=\'Location\']/following-sibling::p',
      clientField: '//p[text()=\'Client\']/following-sibling::p',
      groupField: '//p[text()=\'Group\']/following-sibling::p',
      // Visit Details Card
      visitDetailsCard: '//span[normalize-space(text())=\'Visit Details\']', // data-testid missing for card
      referenceIdField: '//p[text()=\'Reference ID\']/following-sibling::p',
      statusField: '//p[text()=\'Status\']/following-sibling::p',
      dateField: '//p[text()=\'Date\']/following-sibling::p',
      typeField: '//p[text()=\'Type\']/following-sibling::p',
      lengthField: '//p[text()=\'Length\']/following-sibling::p',
      // Available Services Card
      // No unique ids, xpaths, etc...

      // Visit Notes Section
      // ...
      // Visit Notes Card
      visitNotesCard: '//div[@data-testid=\'visit-notes-card\']',
      chiefComplaintField: 'visit-notes__chief-complaint',
      subjectiveField: 'visit-notes__subjective',
      medicalRecordsReviewCheckbox: 'medicalRecordsReview',
      objectiveField: 'visit-notes__objective',
      assessmentField: 'visit-notes__assessment',
      planField: 'visit-notes__plan',
      additionalProviderNotesField: 'visit-notes__additional-provider-notes',
      postVisitNotesField: 'visit-notes__post-visit-task',
      // Diagnosis Card
      diagnosisCard: '//div[@data-testid=\'diagnoses-card\']',
      primaryDiagnosisDropdown: ':r8o:', // This likely will have issues, but it's unique
      addDiagnosisButton: '//button[normalize-space(text())=\'Add diagnosis\']',
      // CPT Codes Card
      cptCodesCard: '//div[@data-testid=\'cpt-codes-card\']',
      cptCodeDropdown: 'visit-notes__cpt-code',
      // Prescriptions Card
      prescriptionsCard: '//div[@data-testid=\'prescriptions-card\']',
      addPrescriptionButton: '//button[normalize-space(text())=\'Add prescription\']',
      // Pharmacy Card
      pharmacyCard: '//div[@data-testid=\'pharmacy-card\']',
      addPharmacyButton: '//button[normalize-space(text())=\'Add pharmacy\']',
      // Referrals Card
      referralsCard: '//div[@data-testid=\'referral-card\']',
      referralTypeDropdown: 'visit-notes__referral',
      // Schedule Next Visit Card
      scheduleNextVisitCard: '//div[@data-testid=\'schedule-next-visit-card\']',
      scheduleNextVisitSwitch: '//span[@data-testid=\'schedule-next-visit-switch\']',
      // Clinical Quality Review
      clinicalQualityReviewCheckbox: 'clinicalQualityReview',
      // Form Submission
      submitNotesButton: '//button[@data-testid=\'submit-visit-notes\']',

      // History Section
      // ...
      selectVisitDropdown: 'history-select',

      // Medical Record Section
      // ...
      // Self-Completed Health Assessments Card
      selfCompletedHealthAssessmentsCard: '//span[normalize-space(text())=\'Self-Completed Health Assessments\']', // data-testid missing for card
      noAssessmentsCompletedMessage: '//p[normalize-space(text())=\'No assessments completed\']',
      // Demographics Card
      demographicsCard: '//h3[normalize-space(text())=\'Demographics\']', // data-testid missing for card
      heightFtDropdown: 'mui-component-select-feet',
      heightInDropdown: 'mui-component-select-inches',
      weightDropdown: 'demographics__weight',
      bmiValueField: '//p[text()=\'BMI:\']/following-sibling::p',
      smokingDropdown: 'mui-component-select-smoking',
      alcoholDropdown: 'mui-component-select-alcohol',
      demographicsSaveButton: '//button[normalize-space(text())=\'Save\']', // This is not unique enough and lacks a proper unique path
      // Allergies Card
      allergiesCard: '//h3[normalize-space(text())=\'Allergies\']', // data-testid missing for card
      noAllergiesEnteredMessage: '//p[normalize-space(text())=\'No allergies entered\']',
      addAllergyButton: '//button[normalize-space(text())=\'Add allergy\']',
      // Medications Card
      medicationsCard: '//h3[normalize-space(text())=\'Medications\']', // data-testid missing for card
      noMedicationsEnteredMessage: '//p[normalize-space(text())=\'No medications entered\']',
      deleteMedicationButton: '//button[@aria-label=\'Delete\']', // This is not unique enough and lacks a proper unique path
      addMedicationButton: '//button[normalize-space(text())=\'Add medication\']',
      // Health Problems Card
      healthProblemsCard: '//h3[normalize-space(text())=\'Health Problems\']', // data-testid missing for card
      noHealthProblemsEnteredMessage: '//p[normalize-space(text())=\'No health problems entered\']',
      addHealthProblemButton: '//button[normalize-space(text())=\'Add health problem\']',
      // Family History Card
      familyHistoryCard: '//h3[normalize-space(text())=\'Family History\']',
      noFamilyHistoryProvidedMessage: '//p[normalize-space(text())=\'No family history provided.\']',
      addFamilyHistoryButton: '//button[normalize-space(text())=\'Add family history\']',
      // Surgery History Card
      surgeryHistoryCard: '//h3[normalize-space(text())=\'Surgery History\']',
      noSurgeryHistoryEnteredMessage: '//p[normalize-space(text())=\'No surgery history entered\']',
      addSurgeryHistoryButton: '//button[normalize-space(text())=\'Add surgery history\']',
      // Immunizations Card
      immunizationsCard: '//h3[normalize-space(text())=\'Immunizations\']', // data-testid missing for card
      noImmunizationsEnteredMessage: '//p[normalize-space(text())=\'No immunizations entered\']',
      addImmunizationButton: '//button[normalize-space(text())=\'Add immunization\']',

      // Quality Section
      // ...
      // Blood Pressure Card
      bloodPressureCard: '//div[@data-testid=\'quality-card-bp\']',
      bloodPressureDescription: '//p[normalize-space(text())=\'Measure adults between 18-85 years when medically necessary (e.g., diagnosis or management of hypertension, management of diabetes, prescribing certain medications) for adequate control (<140/80 mmHg)\']',
      noBloodPressureResultsMessage: '//p[normalize-space(text())=\'No blood pressure results\']',
      addBPResultButton: '(//button[@data-testid=\'add-result-button\'])[1]',
      // Hemoglobin A1C Card
      hemoglobinCard: '//div[@data-testid=\'quality-card-hemoglobin\']',
      hemoglobinDescription: '//p[normalize-space(text())=\'Measure adults between 18-75 years with Type 1 or Type 2 diabetes for adequate control (<8%) and poor control (>9%)\']',
      noHemoglobinResultsMessage: '//p[normalize-space(text())=\'No hemogloblin A1C results\']',
      addHemoglobinResultButton: '(//button[@data-testid=\'add-result-button\'])[2]',
      // Kidney Health Card
      kidneyHealthCard: '//div[@data-testid=\'quality-card-kidney\']',
      kidneyHealthDescription: '//p[normalize-space(text())=\'Complete an annual kidney health evaluation for adults between 18-85 years with Type 1 or Type 2 diabetes, including a blood test for kidney function (eGFR) and a urine test for kidney damage (uACR)\']',
      noKidneyHealthResultsMessage: '//p[normalize-space(text())=\'No kidney health results\']',
      addKidneyHealthResultButton: '(//button[@data-testid=\'add-result-button\'])[3]',

      // Images Section
      // ...
      // Need to setup w/ Image and w/o Image

      // Documents Section
      // ...
      uploadDocumentButton: '//button[@data-testid=\'document-upload-button\']',
      documentTable: '//button[text()=\'Upload document\']/following-sibling::div',
      documentTitleColumnFilter: '//div[normalize-space(text())=\'Document Title\']',
      documentTypeColumnFilter: '//div[normalize-space(text())=\'Document Type\']',
      documentDateColumnFilter: '//div[normalize-space(text())=\'Date Uploaded\']',
      rowsPerPageDropdown: ':rdn:', // This likely will have issues, but it's unique
      paginationLeftButton: '(//button[@aria-label=\'Go to previous page\'])[2]',
      paginationRightButton: '(//button[@aria-label=\'Go to next page\'])[2]',
      ...customSelectors
    };
  }

  /**
   * Verify the Visits Page is present upon redirection from the Dashboard screen.
   */
  async verifyVisitsPage(): Promise<void> {
    await this.waitForElement(this.selectors.visitNotesTab); // update to dashboard element
  }
}
