@api @ignore
Feature: Consultation API

  Scenario: Create a consultation
    Given I log into the provider portal with "autoProvider1"
    And I create a "video" "vpc_initial" consult for "autoMember1" with "autoProvider1"
    Then the consultation should be created successfully