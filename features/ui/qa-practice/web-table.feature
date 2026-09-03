@qa-practice @ui @smoke
Feature: QA Practice Web Table page
  As a QA practitioner
  I want to open the Web Table page
  So that I can validate table example page availability

  Background:
    Given I navigate to the QA Practice home page

  Scenario: Open Web Table example page
    When I open the QA Practice page "web-table.html"
    Then I should be on the QA Practice page "web-table.html"
    And I should see the QA Practice heading "Table Example"