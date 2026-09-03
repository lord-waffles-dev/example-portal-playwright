# Cucumber Tags Reference

This document lists all tags used in the project and their purposes.

## Feature Tags
- `@qa-practice` - Identifies QA Practice website features
- `@api` - Identifies API-related features
- `@example` - Identifies archived reference features

## Scenario Tags
- `@ui` - Identifies UI-related scenarios
- `@smoke` - Identifies smoke scenarios
- `@regression` - Identifies regression scenarios
- `@wip` - Identifies work-in-progress scenarios
- `@only` - Used for running specific scenarios during development
- `@ignore` - Skips the tagged scenario (implemented in hooks)
- `@debug` - Enables debug mode for the scenario (implemented in hooks)
- `@network-capture` - Enables network capture for the scenario (logs requests/responses)

## Usage Examples
- Run UI tests: `npm run ui` // Due to script in package.json
- Run only specific tests: `npm run only`
- Run QA Practice tests: `npm run test:qa-practice`
- Run archived example tests: `npm run test:example`