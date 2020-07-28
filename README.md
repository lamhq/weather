# Weather Forecast

A web app which can display a five day weather forecast for a city.


## Requirements

- Mac OS X, Windows, or Linux
- [Yarn](https://yarnpkg.com/) package + [Node.js](https://nodejs.org/) v8.16.2 or
  newer


## Running project locally

Open terminal in project directory and run the following commands:

```sh
cp .env.example .env
yarn start
```


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!


### `yarn test`

Launch unit test runner with coverage information. Minimum coverage threshold is also configured for the test to pass.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

### `yarn lint`

Launches the linter that analyzes source code to flag programming errors, bugs.


## Technologies used

- React 16, side effect is handled using React Hook
- TypeScript
- React Bootstrap
- styled components for Styling React components


## Source code features

### Unit Test

- [DOM testing](https://testing-library.com/docs/dom-testing-library/intro) to check component render correctly
- [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing) to check component render successfully with no regression
- Unit test for custom React hook with [react-hooks-testing-library](https://react-hooks-testing-library.com/).
- API Mocking with [Jest mocking feature](https://jestjs.io/docs/en/mock-functions).
- Code pushing will be checked by unit test locally before transferring to remote repository.
- Code coverage has to pass a minimum threshold defined in `jest.config.js` to ensure effective unit test.


### Linter configuration

- ESLint is configurated with [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) (customized for TypeScript project), [Prettier](https://prettier.io/).
- Code before committing will be validated automatically by ESLint, commit message is ensured to meet [conventional commit](https://conventionalcommits.org/) format by [commitlint](https://github.com/conventional-changelog/commitlint).


### Webpack configuration

- Webpack is configured for both development and production.
- API request is proxied in development mode to resolved CORS issue.