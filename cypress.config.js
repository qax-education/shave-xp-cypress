require('dotenv').config()

const { defineConfig } = require("cypress");

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)]
      })

      on('file:preprocessor', bundler);
      addCucumberPreprocessorPlugin(on, config)

      return config;
    },
    specPattern: 'cypress/e2e/features/*.feature',
    env: {
      apiUrl: process.env.API_URL,
      apiHelper: process.env.API_HELPER
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: process.env.BASE_URL
  },
});
