@qa-practice @ui @regression
Feature: QA Practice ecommerce flow
  As a QA practitioner
  I want to validate ecommerce user journey
  So that login, shopping cart, order placement, and logout work as expected

  Background:
    Given I navigate to the QA Practice home page
    And I open the QA Practice page "auth_ecommerce.html"

  Scenario: Login to ecommerce page with valid credentials
    When I login to QA Practice ecommerce with email "admin@admin.com" and password "admin123"
    Then I should be logged in to QA Practice ecommerce

  Scenario: Add product to cart in ecommerce page
    Given I login to QA Practice ecommerce with email "admin@admin.com" and password "admin123"
    When I add a product to the QA Practice ecommerce cart
    Then the QA Practice ecommerce cart should contain items

  Scenario: Submit order in ecommerce page
    Given I login to QA Practice ecommerce with email "admin@admin.com" and password "admin123"
    And I add a product to the QA Practice ecommerce cart
    When I proceed to checkout and submit order with phone "5555551234" street "5876 Little Streets" city "London" country "Canada"
    Then I should see a successful QA Practice ecommerce order message for street "5876 Little Streets" city "London" country "Canada"

  Scenario: Logout from ecommerce page
    Given I login to QA Practice ecommerce with email "admin@admin.com" and password "admin123"
    When I logout from QA Practice ecommerce
    Then I should be logged out from QA Practice ecommerce