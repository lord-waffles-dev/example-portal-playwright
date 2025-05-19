@login
Feature: Login Page

  Background: Navigation
    Given provider navigates to the provider portal

  Scenario: Existing provider logs in successfully
    When they enter a valid email
    And they enter a valid password
    And they select login continue button
    And they enter a valid 2fa code
    And they select 2fa continue button
    Then they should be logged in successfully
