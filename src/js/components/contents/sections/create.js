import { renderContent } from '../../index.js';
import { toStringFromFormData, showNotification, reportError, POST, handleException } from '../../../utils/index.js';
import { API_ENDPOINT, STATUS_CODE, SECTIONS_MESSAGES, PATHNAMES } from '../../../constants/index.js';
import { renderNonEditMode } from './view.js';

const UP_STATION_ID = 'upStationId';
const DOWN_STATION_ID = 'downStationId';

export async function requestCreateSection({ target, formData }) {
  try {
    const { upStationId, downStationId, lineId } = target.dataset;

    formData.set(UP_STATION_ID, upStationId);
    formData.set(DOWN_STATION_ID, downStationId);

    const response = await POST(`${API_ENDPOINT.LINES}/${lineId}/sections`, { body: toStringFromFormData(formData) });

    if (!response.ok) {
      await handleException(response, {
        [STATUS_CODE.SECTIONS.CREATE.INVALID_FORM_DATA]: () =>
          showNotification(SECTIONS_MESSAGES.SECTION_NEEDS_TO_BE_SHORTER),
      });
      return;
    }

    renderContent(PATHNAMES.SECTIONS);
    showNotification(SECTIONS_MESSAGES.SECTION_HAS_BEEN_ADDED);
    renderNonEditMode();
  } catch (error) {
    reportError({
      messageToUser: SECTIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}

export function updateSubmitButtonState({ currentTarget }) {
  const $button = currentTarget.submit;

  $button.disabled = !currentTarget.checkValidity();
}
