@example @ignore @dashboard
Feature: Provider Portal Dashboard
  As a Company Health Provider
  I want to access and use the dashboard effectively
  So that I can manage my patient visits and access important resources

  Background: Navigation
    Given provider navigates to the provider portal

  # Visit Management Scenarios
  Scenario: Provider views dashboard with empty state
    When I log into the provider portal with "autoProvider3"
    Then I should see the dashboard page
    And I should see no requested visits
    And I should see no upcoming visits
    
  Scenario: Provider views dashboard with a pending vpc visit
    When I log into the provider portal with "autoProvider1"
    Then I should see the dashboard page
    And I should see a requested vpc visit
    
  Scenario: Provider views dashboard with an upcoming vpc visit
    When I log into the provider portal with "autoProvider1"
    Then I should see the dashboard page
    And I should see an upcoming vpc visit

  # Visit Confirmation Scenarios
  # Investigating Reusability Configuration
#  Scenario: Provider confirms a requested visit
#    When I log into the provider portal with "autoProvider1"
#    And I should see a requested vpc visit
#    And I select a time slot for the requested visit
#    And I click the confirm button
#    Then the visit should be moved to upcoming visits

  # ePrescribe Banner Scenarios
  Scenario: Provider with incomplete ePrescribe setup sees banner
    When I log into the provider portal with "autoProvider2"
    Then I should see the dashboard page
    And I should see the ePrescribe banner

  Scenario: Provider with completed ePrescribe setup does not see banner
    When I log into the provider portal with "autoProvider1"
    Then I should see the dashboard page
    And I should not see the ePrescribe banner