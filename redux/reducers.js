import * as Redux from 'redux';
import * as ReduxForm from 'redux-form';

import { TOGGLE_DETAILS, EDIT_DETAILS } from './actions';

function detailsReducer(visibility = false, action) {
  switch (action.type) {
    case TOGGLE_DETAILS:
      return action.state;
    default:
      return visibility;
  }
}

function editReducer(edit = false, action) {
  switch (action.type) {
    case EDIT_DETAILS:
      return action.state;
    default:
      return edit;
  }
}

export default Redux.combineReducers({
  visibility: detailsReducer,
  edit: editReducer,
  form: ReduxForm.reducer,
});
