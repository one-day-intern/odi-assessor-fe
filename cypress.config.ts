import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...
      
      // It's IMPORTANT to return the config object
      // with any changed environment variables
      // on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
      return config
    },
    baseUrl: "http://localhost:3000",
    env: {

    "codeCoverage": {
      "url": "/api/coverage"
    }
  }
  },
});