import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/models/**', // Ignora arquivos dentro de qualquer pasta chamada "models"
    '!src/**/protocols/**', // Ignora arquivos dentro de qualquer pasta chamada "protocols"
    '!src/**/*protocols*.ts', // Ignora arquivos que tenham "protocols" no nome
  ],
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/presentation/protocols/',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
