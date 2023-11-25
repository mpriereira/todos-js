const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8080',
        specPattern: 'tests/e2e/tests/**/*.spec.{js,jsx}',
        screenshotOnRunFailure: false,
        video: false,
        viewportWidth: 1920,
        viewportHeight: 1080,
        supportFile: 'tests/e2e/support/e2e.js'
    },
    video: false
});
