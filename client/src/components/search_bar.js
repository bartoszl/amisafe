import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  onInputChange(e){
    this.setState({ term: e.target.value });
  }

  onFormSubmit(e){
    e.preventDefault();

    //this.props.fetchWeather(this.state.term);
    this.setState({ term: '' });
  }

  getCurrentLocation(e) {
    e.preventDefault();

    let pos = {};

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(pos.lat+" "+pos.lng);
      });
      this.setState({ term: "Current Position" });
    }
  }

  render() {
    return (
      <div className="container-fluid" style={{backgroundColor:"#222"}}>
        <div className="container col-sm-4 col-sm-offset-4">
          <form style={{textAlign: "center", marginBottom: "150px"}}>
            <input 
              type="text" 
              className="form-control form-control-lg" 
              placeholder="Enter Location" 
              value={this.state.term}
              onChange={this.onInputChange}
              style= {{
                borderRadius: '25px',
                marginTop: '50px',
                marginBottom: '25px'
              }}
            />
            <button 
              className="btn btn-success" 
              style={{ borderRadius:'25px' }}>
                Is the neighbourhood safe?!
            </button>
            <button 
              className="btn btn-info" 
              style={{ borderRadius:'25px' }}
              onClick={this.getCurrentLocation}>
                Get your current location. 
            </button>
          </form>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(SearchBar);
