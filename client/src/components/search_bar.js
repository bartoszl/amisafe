import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';

class SearchBar extends Component {

  render() {
    return (
      <div className="container col-sm-4 col-sm-offset-4">
        <form className="form-inline">
          <input type="text" className="form-control" placeholder="Location" />
          <button className="btn btn-success" >Am I Safe?!</button>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(SearchBar);
