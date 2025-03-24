module.exports = {
  preset: '@shelf/jest-mongodb',
  globalSetup: './path/to/globalSetup.js',
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'testdb',
    },
    binary: {
      version: '4.0.3', // Specify MongoDB version
    },
  },
}
