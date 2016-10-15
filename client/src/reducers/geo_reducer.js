import { FETCH_GEOPOINTS } from '../actions/index';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_GEOPOINTS:
      return { ...state, coords: action.payload.data };
  }

  return state;
}
