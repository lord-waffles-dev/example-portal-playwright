@example @ignore @lab-order-requests
Feature: Lab Order request

  # autoProvider8 is a user who has access to Cologuard and Galleri labs
  Background: Navigation
    Given provider navigates to the provider portal
    Given I log into the provider portal with "autoProvider8"

  Scenario: Verify Lab Order Requests page loads successfully
    When I select the Lab Order Requests link
    Then I should see the Cologuard Lab Orders data grid
    And I should see the Galleri Lab Orders data grid

  # We are currently limited with data setup. In the future this scenario
  # can encompass more searches but for now it just looks for empty search results.
  Scenario Outline: Verify the functionality of the Lab Order Requests search
    When I select the Lab Order Requests link
    And I click the "<Lab Type>" tab
    And I enter the search term "<Search Term>"
    And I get the search result of "<Pending requests>" in Pending requests
    And I get the search result of "<Approved orders>" in Approved orders

    Examples:
      | Search Term            | Lab Type    | Pending requests  | Approved orders    |
      | No results search term | Cologuard   | No results found. | No approved orders |
      | No results search term | Galleri     | No results found. | No approved orders |

  Scenario: Verify the Review modals are displayed on the Lab Order Requests page
    When I select the Lab Order Requests link
    And I select the Review button the the Cologuard page for Pending Requests
    Then I verify that the Cologuard Request modal appears
    And I verify that the Galleri Request modal appears