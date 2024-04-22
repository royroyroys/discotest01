# DISCO Pricing Page QA Assessment

This repository contains the Playwright test suite for DISCO's Pricing Page.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Running the Tests](#running-the-tests)
3. [Test Strategy](#test-strategy)
4. [Test Scenarios](#test-scenarios)
5. [Accessibility Testing](#accessibility-testing)
6. [TBD] (#todos)

## Getting Started

To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/royroyroys/discotest01
   ```

2. Install the required dependencies:
   ```
   cd discotest01
   npm install
   npx playwright install 
   ```

3. Configure the test environment by updating the `config.js` file with the appropriate URLs and credentials (if applicable).

## Running the Tests

To run the Playwright test suite, use the following command:

```
npx playwright test
```

This command will execute all the test files and generate a test report.

To run a specific test file, use the following command:

```
npx playwright test <test-file-name>
```

Replace `<test-file-name>` with the name of the desired test file.

---

## Test Strategy

The test strategy for the DISCO Pricing Page focuses on these main areas:

1. **Business Logic and Accuracy**: Validate that the displayed pricing matches the specification and calculations accurately.

2. **Accessibility Testing**: Automated accessibility testing for legal requirements.

## Test Scenarios

The test scenarios are organized into separate test files based on the pricing tier and the type of testing performed. Here's an overview of the test files:

- `pricing-lite.spec.js`: Tests for the Lite tier pricing and functionality inc toggles
- `pricing-plus.spec.js`: Tests for the Plus tier pricing, functionality, and slider interactions.
- `pricing-pro.spec.js`: Tests for the Pro tier pricing, functionality, and slider interactions.
- `pricing-enterprise.spec.js`: Tests for the Enterprise tier custom pricing.
- `accessibility-axe.spec.js`: Tests for the accessibility of the pricing page using Axe.

Each test file contains multiple test cases covering different scenarios and edge cases.

## TODOs

Site doesn't use input sliders - will be easier to test with this
Site doesn't use IDs on elements to be test - will be easier to test with this
Performance testing TBD
Utilise Lighthouse for more non-functional testing
Dockerise testing




