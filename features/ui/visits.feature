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
      | Date of birth | 01/01/1970 (55 years, 6 months) |
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

   # Pending API Steps before expanding steps/scenario.
#  Scenario: Interact with Diagnosis fields
#    When I click on the "Visit Notes" tab
#    Then I should see the "Diagnoses" card
#    When I search for "Bitten by duck" in the "diagnosis" dropdown
#    And I select "Bitten by duck, initial encounter" from the search results
#    Then "Bitten by duck, initial encounter" should be added to the diagnosis list
#    When I click the Add diagnosis button

   # Pending API Steps before expanding steps/scenario
#  Scenario: Interact with CPT Codes dropdown
#    When I click on the "Visit Notes" tab
#    Then I should see the CPT Codes card
#    When I click on the CPT Code dropdown
#    Then I should see the list of available CPT codes
#    When I select "" from the dropdown
#    Then "" should be selected in the CPT Code field

   # Pending API Steps before expanding steps/scenario
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

   # Pending API Steps before expanding steps/scenario
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

   # Pending API Steps before expanding steps/scenario
#  Scenario: Interact with Schedule Next Visit switch
#    When I click on the "Visit Notes" tab
#    Then I should see the Schedule Next Visit card
#    When I toggle the Schedule Next Visit switch to "ON"
#    Then I should see the schedule next visit form
#    When I select "2 weeks" from the Follow-up Period dropdown
#    And I select "Virtual Primary Care" from the Visit Type dropdown
#    Then the schedule next visit information should be saved correctly
