# ts-sandbox
A NodeJS API template with following tools already setup
- Typescript compiler i.e. ```tsc```
- Absolute imports with `module-alias`
- ```eslint``` for static analysis and linting
- ```vitest``` for testing
- Some basic ```package.json``` scripts
- Git pre-commit hooks with `husky`

## Setup
```bash
$ npm i --save-dev
```

## Run in Development Mode
```bash
$ npm run dev
```

## Run in Production Mode
```bash
$ npm run build
$ npm run start
```
*Note*: The `NODE_ENV` environment variable will be set to `production` when running the app in production mode.

## Linting with ESLint
```bash
$ npm run lint
```

## Running Tests with Vitest
```bash
$ npm run test
```
