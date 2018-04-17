export const TOGGLE_DETAILS = 'TOGGLE_DEATILS';
export const EDIT_DETAILS = 'EDIT_DETAIlS';

export const toggleDetails = desired => ({
  type: TOGGLE_DETAILS,
  state: desired,
});

export const toggleEdit = desired => ({
  type: EDIT_DETAILS,
  state: desired,
});
