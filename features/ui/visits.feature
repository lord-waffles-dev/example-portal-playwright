@visits
Feature: Provider Portal Visits Functionality

  Background: Navigation
    Given I log into the provider portal with "autoProvider1"

  Scenario: Provider views an Upcoming Visit.
    When I am on the dashboard
    And I click the view button
    Then I am on the Visit page