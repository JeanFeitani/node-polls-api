import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/models/**', // Ignora arquivos dentro de qualquer pasta chamada "models"
    '!src/**/protocols/**', // Ignora arquivos dentro de qualquer pasta chamada "protocols"
    '!src/**/*protocols*.ts', // Ignora arquivos que tenham "protocols" no nome
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/presentation/protocols/',
  ],
}

export default config
