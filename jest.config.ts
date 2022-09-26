// eslint-disable-next-line import/no-anonymous-default-export
export default {
  displayName: 'app',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '.+\\.(css|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: './coverage/code',
  collectCoverageFrom: ['./src/**/!(*.stories).tsx'],
  coverageThreshold: {
    global: {
      statements: 85,
    },
  },
};
