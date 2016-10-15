import { combineReducers } from 'redux';
import geoReducer from './geo_reducer';

const indexReducer = combineReducers({
  coords: geoReducer
});

export default indexReducer;
