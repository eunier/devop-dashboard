import { createStore } from 'redux';
import type from './type';

const initialState = {
  appDetailsIndex: null,
  appsStatusOverall: [],
  appsStatusDetail: [],
  appsStatusHistory: [],
  socket: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
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
    case type.UPDATE_FULL_HISTORY:
      return {
        ...state,
        appsStatusHistory: action.payload
      };
    // case type.ADD_APP_DETAILS_HISTORY:
    //   const socket = action.payload;

    //   if (state.appsStatusHistory.length === 0) {
    //     socket.on('apps_status_history', data => {
    //       console.log('apps_status_history', data);
    //     });
    //   }

    //   return {
    //     ...state,
    //     appsStatusHistory: action.payload
    //   };
    case type.SET_APP_DETAILS_INDEX:
      return {
        ...state,
        appDetailsIndex: action.payload
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
