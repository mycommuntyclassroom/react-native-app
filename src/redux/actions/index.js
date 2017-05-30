import * as authActions from './auth';
import * as eventsActions from './events';
import * as userActions from './user';
import * as notificationActions from './notifications';

/**
  App Actions
  ---
  ./src/actions/index.js

  - The app actions include all of the actions used by this app.

  - In this file we can choose to use only the actions that we absolutely need
  (in case this repo houses many apps).

  @returns {object} appActions
*/

const appActions = {
  ...authActions,
  ...eventsActions,
  ...userActions,
  ...notificationActions
};

export default appActions;
