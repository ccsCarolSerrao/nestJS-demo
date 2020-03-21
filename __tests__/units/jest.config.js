const localDir = '<rootDir>/__tests__/units/'

module.exports = {
  testEnvironment: 'node',
  bail: true,
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  roots: [localDir],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '.spec.ts$',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/!**/*.d.ts'],
  coverageDirectory: `${localDir}coverage`,
}
