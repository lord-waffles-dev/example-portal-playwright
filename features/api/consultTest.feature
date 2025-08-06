@api @ignore
Feature: Consultation API

  Scenario: Create a consultation after checking for existing consults
    Given I check for existing consults for provider "autoProvider1"
    And I close all existing consults for provider "autoProvider1"
    And I create a "video" "vpc_initial" consult for "autoMember1" with "autoProvider1"
    Then the consultation should be created successfully