@visits
Feature: Provider Portal Visits Functionality

  Background: Navigation
    Given I log into the provider portal with "autoProvider1"
    When I should see the dashboard page
    And I click the "View" button for the first upcoming visit
    Then I should be on the Visit page

  Scenario: Verify and validate Patient Details fields
    When I view the Patient Details card
    Then I should see the following patient information with correct values:
      | Field         | Expected Value                  |
      | Date of birth | 01/01/1970 (55 years, 5 months) |
      | ID            | 266110416                       |
      | Gender        | M                               |
      | Location      | TX                              |
      | Client        | Recuro Demo                     |
      | Group         | Recuro Demo                     |

  Scenario: Verify and validate Visit Details fields
    When I view the Visit Details card
    Then I should see the following visit information with correct values:
      | Field        | Expected Value                       |
      | Reference ID | 2709092                              |
      | Status       | Assigned                             |
      | Date         | Monday, 05/26/2025 @ 10:00 AM CT     |
      | Type         | Virtual Primary Care (Initial Visit) |
      | Length       | 45 Minutes                           |

  # Scenarios Tested for the exception of final step
  # Setup Required: WIP api steps to establish consults for Auto Providers
#  Scenario: Interact with Visit Notes fields
#    When I click on the "Visit Notes" tab
#    Then I should see the "Visit Notes" card
#    When I enter "Patient reports headache" in the "Chief Complaint" field
#    And I enter "Patient has been experiencing headaches for 3 days" in the "Subjective" field
#    And I check the "Medical Records Review" checkbox
#    And I enter "BP: 120/80, Temp: 98.6F" in the "Objective" field
#    And I enter "Tension headache" in the "Assessment" field
#    And I enter "OTC pain reliever, rest, hydration" in the "Plan" field
#    And I enter "Follow up in 2 weeks if symptoms persist" in the "Additional Provider Notes" field
#    And I enter "Schedule follow-up appointment" in the "Post Visit Notes" field
#    Then all entered information should be saved correctly

   #
#  Scenario: Interact with Diagnosis fields
#    When I click on the "Visit Notes" tab
#    Then I should see the "Diagnoses" card
#    When I search for "Bitten by duck" in the "diagnosis" dropdown
#    And I select "Bitten by duck, initial encounter" from the search results
#    Then "Bitten by duck, initial encounter" should be added to the diagnosis list
#    When I click the Add diagnosis button
#
#  Scenario: Interact with CPT Codes dropdown
#    When I click on the "Visit Notes" tab
#    Then I should see the CPT Codes card
#    When I click on the CPT Code dropdown
#    Then I should see the list of available CPT codes
#    When I select "99213 - Office Visit, Est Pt, Low Complexity" from the dropdown
#    Then "99213 - Office Visit, Est Pt, Low Complexity" should be selected in the CPT Code field
#
#  Scenario: Interact with Prescriptions functionality
#    When I click on the "Visit Notes" tab
#    Then I should see the Prescriptions card
#    When I click the "Add prescription" button
#    Then I should see the prescription form
#    When I search for "Ibuprofen" in the medication field
#    And I select "Ibuprofen 200mg tablet" from the search results
#    And I enter "1 tablet" in the Dose field
#    And I select "Oral" from the Route dropdown
#    And I enter "Every 6 hours as needed for pain" in the Instructions field
#    And I enter "30" in the Quantity field
#    And I select "0" from the Refills dropdown
#    And I click the "Save prescription" button
#    Then "Ibuprofen 200mg tablet" should be added to the prescriptions list
#
#  Scenario: Interact with Pharmacy functionality
#    When I click on the "Visit Notes" tab
#    Then I should see the Pharmacy card
#    When I click the "Add pharmacy" button
#    Then I should see the pharmacy search field
#    When I enter "12345" in the ZIP code field
#    And I click the "Search" button
#    Then I should see a list of pharmacies
#    When I select the first pharmacy from the list
#    Then the selected pharmacy should be displayed in the Pharmacy card
#
#  Scenario: Interact with Schedule Next Visit switch
#    When I click on the "Visit Notes" tab
#    Then I should see the Schedule Next Visit card
#    When I toggle the Schedule Next Visit switch to "ON"
#    Then I should see the schedule next visit form
#    When I select "2 weeks" from the Follow-up Period dropdown
#    And I select "Virtual Primary Care" from the Visit Type dropdown
#    Then the schedule next visit information should be saved correctly
#
#  Scenario: Interact with Demographics fields in Medical Record
#    When I click on the "Medical Record" tab
#    And I view the Demographics card
#    When I select "5" from the Height (ft) dropdown
#    And I select "10" from the Height (in) dropdown
#    And I enter "180" in the Weight field
#    Then I should see the calculated BMI value
#    When I select "Never smoker" from the Smoking Status dropdown
#    And I select "Non-drinker" from the Alcohol Status dropdown
#    And I click the Save button
#    Then the demographics information should be saved successfully
#
#  Scenario: Interact with Allergies in Medical Record
#    When I click on the "Medical Record" tab
#    And I view the Allergies card
#    When I click the "Add allergy" button
#    Then I should see the allergy form
#    When I search for "Penicillin" in the allergy field
#    And I select "Penicillin" from the search results
#    And I select "Hives" from the Reaction dropdown
#    And I select "Severe" from the Severity dropdown
#    And I click the "Save allergy" button
#    Then "Penicillin" should be added to the allergies list
#
#  Scenario: Interact with Quality Measures fields
#    When I click on the "Quality" tab
#    Then I should see the Blood Pressure card
#    When I click the "Add result" button in the Blood Pressure card
#    Then I should see the blood pressure form
#    When I enter "120" in the Systolic field
#    And I enter "80" in the Diastolic field
#    And I select today's date in the Date field
#    And I click the "Save result" button
#    Then "120/80" should be added to the blood pressure results
#
#  Scenario: Interact with Documents upload
#    When I click on the "Documents" tab
#    Then I should see the "Upload document" button
#    When I click the "Upload document" button
#    Then I should see the document upload form
#    When I enter "Test Report" in the Document Title field
#    And I select "Lab Report" from the Document Type dropdown
#    And I upload a test file
#    And I click the "Save document" button
#    Then "Test Report" should be added to the document table
#
#  Scenario: Verify document table filtering
#    When I click on the "Documents" tab
#    Then I should see the document table
#    When I click on the Document Title column filter
#    And I enter "Test" in the filter field
#    Then I should see only documents with "Test" in the title
#    When I clear the Document Title filter
#    And I click on the Document Type column filter
#    And I select "Lab Report" from the filter dropdown
#    Then I should see only documents with type "Lab Report"