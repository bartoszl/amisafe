import { combineReducers } from 'redux';
import geoReducer from './geo_reducer';

const indexReducer = combineReducers({
  geopoints: geoReducer
});

export default indexReducer;
