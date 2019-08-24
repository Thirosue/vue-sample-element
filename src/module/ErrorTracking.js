import * as Sentry from '@sentry/browser';

export default class ErrorTracking {
  static configureScope(session) {
    Sentry.configureScope((scope) => {
      scope.setUser({
        id: session.id,
        username: `${session.first_name} ${session.last_name}`,
        email: session.email,
      });
    });
  }

  static captureException(err) {
    Sentry.captureException(err);
  }

  static showReportDialog() {
    Sentry.showReportDialog();
  }

  static captureMessage(message) {
    Sentry.captureMessage(message);
  }
}
