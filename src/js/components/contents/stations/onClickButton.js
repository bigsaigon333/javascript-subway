import { renderNonEditMode, renderEditMode } from './view.js';
import requestRemoveStation from './remove.js';
import { STATIONS_MESSAGES } from '../../../constants/index.js';

export default function onClickButton({ target }) {
  if (target.classList.contains('edit-button')) {
    onClickEditButton(target);
    return;
  }

  if (target.classList.contains('check-button')) {
    onClickCheckButton(target);
    return;
  }

  if (target.classList.contains('remove-button')) {
    onClickRemoveButton(target);
    return;
  }

  if (target.classList.contains('undo-button')) {
    onClickUndoButton(target);
  }
}

function onClickEditButton($editButton) {
  const $editForm = $editButton.closest('.edit-form');
  renderEditMode($editForm);
}

function onClickCheckButton($checkButton) {
  const $editForm = $checkButton.closest('.edit-form');

  // eslint-disable-next-line no-new
  new FormData($editForm);
}

function onClickRemoveButton($removeButton) {
  const $editForm = $removeButton.closest('.edit-form');
  // eslint-disable-next-line no-alert
  if (!window.confirm(STATIONS_MESSAGES.ARE_YOU_SURE_TO_REMOVE)) {
    return;
  }

  requestRemoveStation($editForm);
}

function onClickUndoButton($undoButton) {
  const $editForm = $undoButton.closest('.edit-form');
  renderNonEditMode($editForm);
}
