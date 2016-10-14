import { combineReducers } from 'redux';

const indexReducer = combineReducers({
  state: (emptyState = {}) => emptyState
});

export default indexReducer;
