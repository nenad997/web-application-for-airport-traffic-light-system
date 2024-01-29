import { uiActions } from "../slices/ui-slice";

export async function showNotificationHandler(payload) {
  return async (dispatch) => {
    dispatch(uiActions.showNotification(payload));
  };
}

export async function hideNotificationHandler() {
  return async (dispatch) => {
    dispatch(uiActions.hideNotification());
  };
}
