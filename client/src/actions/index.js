import axios from 'axios';

export const FETCH_GEOPOINTS = 'FETCH_GEOPOINTS';

const CHICAGO_URL = "https://data.cityofchicago.org/resource/6zsd-86xi.json";

export function fetchGeopoints() {
  const startDate = '2016-01-01T00:00:00';
  const stopDate = '2016-06-30T23:59:59';
  const limit = 300;

  const req = axios.get(`${CHICAGO_URL}`, {
      params: {
        "$limit" : limit,
      }
    });

  return {
    type: FETCH_GEOPOINTS,
    payload: req
  };
}
