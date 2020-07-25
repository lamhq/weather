module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // refer from create-react-app source code
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 80,
      statements: 80,
    },
  },
};
