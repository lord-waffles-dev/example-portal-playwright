# Cucumber Tags Reference

This document lists all tags used in the project and their purposes.

## Feature Tags
- `@foo` - Used for feature-level categorization // Example
- `@api` - Identifies API-related features

### Recuro Feature Tags
- `@login` - Login Feature
- `@dashboard` - Dashboard Feature

## Scenario Tags
- `@ui` - Identifies UI-related scenarios
- `@only` - Used for running specific scenarios during development
- `@ignore` - Skips the tagged scenario (implemented in hooks)
- `@debug` - Enables debug mode for the scenario (implemented in hooks)

### Recuro Scenario Tags
- `@happy` - Used for Happy-Path test scenarios
- `@smoke` - Used for Smoke test scenarios
- `@reg` - Used for Regression test scenarios

## Usage Examples
- Run UI tests: `npm run ui` // Due to script in package.json
- Run only specific tests: `npm run only`
- Run smoke tests: `npm run test -- --tags @smoke`