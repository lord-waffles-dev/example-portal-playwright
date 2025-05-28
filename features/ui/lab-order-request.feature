@lab-order-requests
Feature: Lab Order request

  # autoProvider8 is a user who has access to Cologuard and Galleri labs
  Background: Navigation
    Given provider navigates to the provider portal
    Given I log into the provider portal with "autoProvider8"

  Scenario: Verify Lab Order Requests page loads successfully
    When I select the Lab Order Requests link
    And I should see the Cologuard Lab Orders data grid
    And I should see the Galleri Lab Orders data grid

