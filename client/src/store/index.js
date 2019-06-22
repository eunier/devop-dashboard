import { createStore } from 'redux';
import type from './type';

const initialState = {
  appsStatusOverall: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.UPDATE_APPS_STATUS_OVERALL:
      return {
        ...state,
        appsStatusOverall: action.payload
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
