@qa-practice @ui @smoke
Feature: QA Practice Alerts page
  As a QA practitioner
  I want to open the Alerts page
  So that I can validate the QA Practice site is reachable and functional

  Background:
    Given I navigate to the QA Practice home page

  Scenario: Open Alerts example page
    When I open the QA Practice page "alerts.html"
    Then I should be on the QA Practice page "alerts.html"
    And I should see the QA Practice heading "Alerts Example"