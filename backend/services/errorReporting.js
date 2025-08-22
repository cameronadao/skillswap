// backend/services/errorReporting.js
const Sentry = require('@sentry/node');

class ErrorReporting {
  static init() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.npm_package_version
    });
  }
  
  static captureException(err) {
    Sentry.captureException(err);
  }
  
  static captureMessage(message) {
    Sentry.captureMessage(message);
  }
}

module.exports = ErrorReporting;