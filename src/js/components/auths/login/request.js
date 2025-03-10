import { goTo } from '../../../router/index.js';
import { showNotification, reportError, toStringFromFormData, POST, handleException } from '../../../utils/index.js';
import { login } from '../../../auth/index.js';
import { AUTH_MESSAGES, PATHNAMES, STATUS_CODE, API_ENDPOINT } from '../../../constants/index.js';

const requestLogin = async ({ formData }) => {
  try {
    const response = await POST(API_ENDPOINT.LOGIN, {
      body: toStringFromFormData(formData),
    });

    if (!response.ok) {
      await handleException(response, {
        [STATUS_CODE.LOGIN.FAILED]: () => showNotification(AUTH_MESSAGES.USER_EMAIL_OR_PASSWORD_IS_INVALID),
      });
      return;
    }

    const { accessToken } = await response.json();

    login(accessToken);
    showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_COMPLETED);
    goTo(PATHNAMES.STATIONS);
  } catch (error) {
    reportError({
      messageToUser: AUTH_MESSAGES.LOGIN_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
};

export default requestLogin;
