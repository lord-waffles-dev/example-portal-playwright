@eprescribe
Feature: ePrescribe

  Background: Navigation
    Given provider navigates to the provider portal

  # Provider w/o ePrescribe
  Scenario: Verify provider is presented with ePrescribe Banner
    When I log into the provider portal with "autoProvider2"
    And I am on the dashboard
    Then Provider is presented with the banner

  # Provider w/ ePrescribe
  Scenario: Verify provider is no longer presented with ePrescribe Banner
    When I log into the provider portal with "autoProvider1"
    And I am on the dashboard
    Then Provider is not presented with the banner