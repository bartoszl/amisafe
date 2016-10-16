import React, { Component } from 'react';

import SearchBar from './search_bar';
import GoogleMap from './google_map';
import Navbar from './navbar';

export default class App extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <GoogleMap />
        <SearchBar />
      </div>
    );
  }
}
