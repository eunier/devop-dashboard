import { createStore } from 'redux';
import type from './type';

const initialState = {
  appDetailsIndex: null,
  appsStatusOverall: [],
  appsStatusDetail: [],
  appsStatusHistory: []
};

const reducer = (state = initialState, action) => {
  console.log(new Date().getSeconds(), action);
  switch (action.type) {
    case type.UPDATE_APPS_STATUS_OVERALL:
      return {
        ...state,
        appsStatusOverall: action.payload.overall,
        appsStatusDetail: action.payload.detail
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
    case type.ADD_APP_DETAILS_HISTORY:
      console.log(action);
      return {
        ...state
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
