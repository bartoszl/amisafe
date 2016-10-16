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

    geopoints.then(function(geopoints){
      //console.log(geopoints.payload.data);
      let heatMapData = [];

      geopoints.payload.data.map(function(geo){
        if(geo.latitude && geo.longitude)
          heatMapData.push({location: new google.maps.LatLng(geo.latitude, geo.longitude),
                            weight: 1 });
      });
      
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
      <div id="map" style={{height: '650px', width: '100%'}}>
      </div>
    );
  }
}

function mapStateToProps({ geopoints }) {
  return { geopoints };
}

export default connect(mapStateToProps, actions)(ClusterGoogleMap);

