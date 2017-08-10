import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import mapStyle from '../styles/mapStyle'
import styles from '../styles'

const initialRegion={
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class Map extends Component {

  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.app.goToScene('loading', { sup: true });
    // this.props.app.goToScene('Map', { hostID: 123 });
  }
  
  render() {
    const { globalStyles, app } = this.props;
    return (
      <View style={{flex:1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={initialRegion}
          style={StyleSheet.absoluteFill}
        >
          <MapView.Circle 
            center={{latitude: 37.78825, longitude: -122.4324}}
            radius={1000}
            fillColor='rgba(160,123,220,0.22)'
            strokeColor='rgba(160,123,220,0.22)'
          />
        </MapView>
      </View>
    );
  };

}

export default Map;


/**

*/