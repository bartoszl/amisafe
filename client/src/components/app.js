import React, { Component } from 'react';

import SearchBar from './search_bar';
import GoogleMap from './google_map';

export default class App extends Component {

  render() {
    return (
      <div>
        <SearchBar />
        <GoogleMap />
      </div>
    );
  }
}
