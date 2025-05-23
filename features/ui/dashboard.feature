@dashboard
Feature: Dashboard Page

  Background: Navigation
    Given provider navigates to the provider portal

  Scenario: Provider views dashboard with empty state
    When I log into the provider portal with "autoProvider3"
    Then I observe no requested visits
    And I observe no upcoming visits
    
  Scenario: Provider views dashboard with a pending vpc visit
    When I log into the provider portal with "autoProvider1"
    Then I observe an requested vpc visit
    
  Scenario: Provider views dashboard with an upcoming vpc visit
    When I log into the provider portal with "autoProvider1"
    Then I observe an upcoming vpc visit