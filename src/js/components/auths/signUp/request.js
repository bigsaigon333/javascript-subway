import { goTo } from '../../../router/index.js';
import { handleException, POST, reportError, showNotification, toStringFromFormData } from '../../../utils/index.js';
import { API_ENDPOINT, AUTH_MESSAGES, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';

export default async function requestSignUp({ formData }) {
  try {
    const response = await POST(API_ENDPOINT.SIGN_UP, {
      body: toStringFromFormData(formData),
    });

    if (!response.ok) {
      await handleException(response, {
        [STATUS_CODE.SIGN_UP.EMAIL_DUPLICATED]: () => showNotification(AUTH_MESSAGES.USER_EMAIL_IS_DUPLICATED),
      });
      return;
    }

    showNotification(AUTH_MESSAGES.SIGN_UP_HAS_BEEN_COMPLETED);
    goTo(PATHNAMES.LOGIN);
  } catch (error) {
    reportError({
      messageToUser: AUTH_MESSAGES.SIGN_UP_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}
