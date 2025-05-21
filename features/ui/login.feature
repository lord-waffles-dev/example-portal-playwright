@login
Feature: Login Page

  Background: Navigation
    Given provider navigates to the provider portal

  Scenario Outline: Existing provider logs in successfully
    When they enter a valid email with "<email>"
    And they enter a valid password with "<password>"
    And they select login continue button
    And they enter a valid 2fa code
    And they select 2fa continue button
    Then they should be logged in successfully

    Examples:
      | email         | password      |
      | autoProvider1 | autoProvider1 |
      | autoProvider2 | autoProvider2 |
      | autoProvider3 | autoProvider3 |
      | autoProvider4 | autoProvider4 |
      | autoProvider5 | autoProvider5 |
      | autoProvider6 | autoProvider6 |
      | autoProvider7 | autoProvider7 |
      | autoProvider8 | autoProvider8 |

  Scenario Outline: Existing provider inputs email that does not match an account
    When they enter an invalid email
    And they enter a valid password with "<password>"
    And they select login continue button
    Then they should observe an email error message

    Examples:
      | password       |
      | validProvider1 |


  Scenario Outline: Existing provider inputs password that does not match an account
    When they enter a valid email with "<email>"
    And they enter an invalid password
    And they select login continue button
    Then they should observe an password error message

    Examples:
    | email          |
    | validProvider1 |