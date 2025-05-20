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

  Scenario: Existing provider inputs email that does not match an account
    When they enter an invalid email
    And they enter a valid password
    And they select login continue button
    Then they should observe an email error message

  Scenario: Existing provider inputs password that does not match an account
    When they enter a valid email
    And they enter an invalid password
    And they select login continue button
    Then they should observe an password error message