import {push, replace} from 'connected-react-router';
import {RouteConstants as Routes} from '../constants';

/**
 * Handles all navigation within the application.
 *
 * @class NavigateActions
 */
class NavigateActions {
  /**
   * Redirect the browser to another path.
   *
   * @static
   * @param {string} path - Path to redirect to.
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigate(path) {
    return (dispatch) => {
      dispatch(push(path));
    };
  }

  /**
   * Since we render the Home component if no existing URL/Route exists, we cleanup the browser address bar.
   * Alter the URl to be the root. Used when a manually entered URL by the end user does not exist.
   *
   * @static
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static noValidPathRedirect() {
    console.log('no valid redirect path');

    return (dispatch) => {
      dispatch(replace(Routes.DASHBOARD));
    };
  }

  /**
   * Navigate the user to the dashboard page.
   *
   * @static
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToDashboard() {
    return (dispatch) => {
      dispatch(push('/dashboard'));
    };
  }

  /**
   * Navigate the user to the account page.
   *
   * @static
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToAccount() {
    return (dispatch) => {
      dispatch(push('/account'));
    };
  }

  /**
   * Navigate the user to the sign up page.
   *
   * @static
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToSignUp() {
    return (dispatch) => {
      dispatch(push(Routes.REGISTER));
    };
  }

  /**
   * Navigate the user to the sign up page.
   *
   * @static
   * @param {object} [data=null] - The data to be passed to create app page.
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToCreateApp(data = null) {
    return (dispatch) => {
      dispatch(push(Routes.CREATE_APP, data));
    };
  }

  /**
   * If the user attempts to view a page they need authentication for, redirect them to the sign in page and then to the page they initially tried to view after authenticated.
   *
   * @static
   * @param {string} [redirectAfterLogin=null] - The destination to redirect to after the user has logged in.
   * @param {boolean} [withReplace=true] - Replace the url rather than push a new one.
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToSignIn(redirectAfterLogin = null, withReplace = true) {
    return (dispatch) => {
      let url = redirectAfterLogin ? `/login?next=${redirectAfterLogin}` : Routes.LOGIN;

      if (withReplace) {
        dispatch(replace(url));
      } else {
        dispatch(push(url));
      }
    };
  }

  /**
   * If the user attempts to view a page they need authentication for, redirect them to the sign in page and then to the page they initially tried to view after authenticated.
   *
   * @static
   * @param {string} [redirect=null] - The destination to redirect to after the user has logged in.
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToPermissions(redirect = null) {
    return (dispatch) => {
      let url = redirect? `/permissions${redirect}` : Routes.PERMISSIONS;
      dispatch(push(url));
    };
  }

  /**
   * Navigate the user to password reset page.
   *
   * @static
   * @param {string} [token] - The token required by the backend to initiate a password reset.
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigateToPasswordReset(token) {
    return (dispatch) => {
      dispatch(push(Routes.REGISTER + `/?token=${token}`));
    };
  }

  static navigateAddApp() {
    return (dispatch) => {
      dispatch(push(Routes.CREATE_APP));
    };
  }

}

export default NavigateActions;
