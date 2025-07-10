@login
Feature: Provider Portal Login Functionality
  As a Recuro Health Provider
  I want to securely access the provider portal
  So that I can manage patient care and administrative tasks

  Background: Navigation
    Given provider navigates to the provider portal

  # Happy Path Scenarios
  Scenario Outline: Existing provider logs in successfully
    When they enter a valid email with "<email>"
    And they enter a valid password with "<password>"
    And they click the continue button
    And they enter a valid 2FA code
    And they click the 2FA continue button
    Then they should be successfully logged in to the dashboard

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

  # Validation Scenarios
  Scenario: Provider attempts to login with empty credentials
    # They leave the email field empty
    # They leave the password field empty
    When they click the continue button
    Then they should see an email error message "Please enter a valid email address"
    And they should see a password error message "Please enter a password"

  # Tooltip is present as well as error message
  # Expand in future iteration on checking tooltip
  Scenario Outline: Provider attempts to login with invalid email format
    When they enter an invalid email format with "<invalid_email>"
    And they enter a valid password with "<password>"
    And they click the continue button
    Then they should see an email error message "Please enter a valid email address"

    Examples:
      | invalid_email | password      |
      | test@         | autoProvider1 |
      | test@test     | autoProvider1 |
      | test.com      | autoProvider1 |
      | @test.com     | autoProvider1 |

  Scenario: Provider attempts to login with non-existent account
    When they enter an invalid email with "nonexistant@example.com"
    And they enter a valid password with "validProvider1"
    And they click the continue button
    Then they should see an email error message "Incorrect email or password"

  Scenario: Provider attempts to login with incorrect password
    When they enter a valid email with "validProvider1"
    And they enter an invalid password
    And they click the continue button
    Then they should see a password error message "Incorrect email or password"

  # 2FA Scenarios
  Scenario: Provider enters invalid 2FA code
    When they enter a valid email with "no2FAProvider"
    And they enter a valid password with "no2FAProvider"
    And they click the continue button
    And they enter an invalid 2FA code
    And they click the 2FA continue button
    Then they should see a 2FA error message "Incorrect verification code. Please try again."

   # Missing Functional/Setup for Tests to Run Scenario
#  Scenario: Provider requests a new 2FA code
#    When they enter a valid email with "validProvider1"
#    And they enter a valid password with "validProvider1"
#    And they click the login continue button
#    And they click the resend 2FA code button
#    Then they should see a confirmation message that a new code was sent

  # Remember Me Functionality
   # Work on this next
#  Scenario: Provider enables "Remember this device" for 2FA
#    When they enter a valid email with "validProvider1"
#    And they enter a valid password with "validProvider1"
#    And they click the login continue button
#    And they enter a valid 2FA code
#    And they check the "Remember this device" checkbox
#    And they click the 2FA continue button
#    Then they should be successfully logged in to the dashboard
#    When they log out and log back in with the same credentials
#    Then they should not be prompted for 2FA

  # Password Management
   # Value is still present in DOM. No Text Content.
#  Scenario: Provider toggles password visibility
#    When they enter a valid email with "autoProvider1"
#    And they enter a valid password with "autoProvider1"
#    And they click the password visibility toggle
#    Then the password should be visible as "RecuroTest1!"
#    When they click the password visibility toggle
#    Then the password "RecuroTest1!" should be masked

   # Missing Functional/Setup for Tests to Run Scenario
#  Scenario: Provider uses forgot password functionality
#    When they click the "Forgot Password" link
#    Then they should be redirected to the password reset page
#    When they enter a valid email "autoProvider1"
#    And they click the reset password button
#    Then they should see a confirmation message that reset instructions were sent

  # Security Scenarios
   # Verify what is currently in place for new provider portal
#  Example Scenario: Provider account gets locked after multiple failed attempts
#    When they enter a valid email "autoProvider1"
#    And they enter an incorrect password "wrongPassword1"
#    And they click the login continue button
#    And they repeat the failed login attempt 4 more times
#    Then they should see an account locked message
#    And they should be provided with account recovery options