import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ClusterGoogleMap extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    let geopoints = this.props.fetchGeopoints();

    geopoints.then(function(geopoints){
      console.log(geopoints.payload.data.length);
      let heatMapData = [];
      

      geopoints.payload.data.map(function(geo){
        if(geo.latitude && geo.longitude){
          heatMapData.push({location: new google.maps.LatLng(geo.latitude, geo.longitude),
                            weight: 1 });
        }
      });
      
      let chicago = new google.maps.LatLng(41.86, -87.66);

      let map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 13,
        mapTypeId: 'satellite',
        styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
      });

      let heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
      });

      heatmap.setMap(map);
    });
  }

  render() {
    return (
      <div>
        <div id="map" style={{height: '650px', width: '100%'}} />
      </div>
    );
  }
}

function mapStateToProps({ geopoints }) {
  return { geopoints };
}

export default connect(mapStateToProps, actions)(ClusterGoogleMap);

