import * as Sentry from "@sentry/browser";
import config from "../config.json";

function init() {
  Sentry.init({ dsn: config.dsn });
}
function log(error) {
  Sentry.withScope(scope => {
    scope.setExtras(error.response);
    const eventId = Sentry.captureException(error);
    this.setState({ eventId });
  });
}
export default {
  init,
  log
};
