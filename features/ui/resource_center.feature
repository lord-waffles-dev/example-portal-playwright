@resource_center
Feature: Provider Resource Center

  Background: Navigation
    Given provider navigates to the provider portal
    Given I log into the provider portal

 Scenario: Verify Resource Center links are functional
   When I select the Resource Center link
   And I verify the Video Consult Troubleshooting Guide opens a modal
   Then I verify all other links within the Resource Center modal
