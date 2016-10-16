import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';
import Alert from 'react-s-alert';

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

  getSafetyIndicator(e) {
    e.preventDefault();
    let address = this.state.term;
  
    axios.post('/api/address', {
      address: address
    })
    .then(function(response){
      console.log(response);
      let indicator = response.data.answer;

      if(indicator == -1) {
        alert("Damn! Your neighbourhood is dangerous.");
      } else if(indicator == 0) {
        alert("Don't worry! Your neighbourhood is average.");
      } else {
        alert("Your neighbourhood is super safe!");
      }
      
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
    return (
      <div className="container-fluid" style={{backgroundColor:"#222"}}>
        <div className="col-sm-3 col-sm-offset-1">
          <img 
            className="" 
            src="/img/dinosaur.png" 
            style={{ height: '150px', width: 'auto', marginTop: '50px'}}/>
        </div>
        <div className="container col-sm-4">
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
              style={{ borderRadius:'25px'}}
              onClick={this.getSafetyIndicator.bind(this)}>
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
  return {alert: state.alert};
}

export default connect(mapStateToProps, actions)(SearchBar);
