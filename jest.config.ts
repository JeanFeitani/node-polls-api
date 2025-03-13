import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
