import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ClusterGoogleMap extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    let geopoints = this.props.fetchGeopoints();

    
    var heatMapData2 = [
      {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
      new google.maps.LatLng(37.782, -122.445),
      {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
      {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
      {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
      new google.maps.LatLng(37.782, -122.437),
      {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

      {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
      {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
      new google.maps.LatLng(37.785, -122.443),
      {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
      new google.maps.LatLng(37.785, -122.439),
      {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
      {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
    ];

    //console.log(headMapData2);
    
    geopoints.then(function(geopoints){
      //console.log(geopoints.payload.data);
      let heatMapData = [];

      geopoints.payload.data.map(function(geo){
        console.log(geo.latitude+" "+geo.longitude);
        if(geo.latitude && geo.longitude)
          heatMapData.push({location: new google.maps.LatLng(geo.latitude, geo.longitude),
                            weight: 1 });
      });
      
      console.log(heatMapData);
  
      let sanFrancisco = new google.maps.LatLng(41.86, -87.66);

      let map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 13,
        mapTypeId: 'satellite'
      });

      let heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
      });

      heatmap.setMap(map);
    });
  }

  render() {
    return (
      <div id="map" style={{height: '500px', width: '500px'}}/>
    );
  }
}

function mapStateToProps({ geopoints }) {
  return { geopoints };
}

export default connect(mapStateToProps, actions)(ClusterGoogleMap);

