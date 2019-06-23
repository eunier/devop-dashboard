import { createStore } from 'redux';
import type from './type';

const initialState = {
  appDetailsIndex: null,
  appsStatusOverall: [],
  appsStatusDetail: [],
  appsStatusHistory: []
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case type.UPDATE_APPS_STATUS_OVERALL:
      return {
        ...state,
        appsStatusOverall: action.payload
      };
    case type.UPDATE_APPS_STATUS_DETAIL:
      return {
        ...state,
        appsStatusDetail: action.payload
      };
    case type.ADD_APP_DETAILS_HISTORY:
      return {
        ...state,
        appsStatusHistory: action.payload
      };
    case type.SET_APP_DETAILS_INDEX:
      return {
        ...state,
        appDetailsIndex: action.payload
      };
    case type.RESET_APP_DETAILS_INDEX:
      return {
        ...state,
        appDetailsIndex: null
      };
    default:
      return state;
  }
};

const actionSanitizer = action =>
  action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data
    ? { ...action, data: '<<LONG_BLOB>>' }
    : action;

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({
      actionSanitizer,
      stateSanitizer: state =>
        state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
    })
);

export default store;
