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
          initialRegion={initialRegion}
          style={StyleSheet.absoluteFill}
        >
        </MapView>
      </View>
    );
  };

}

export default Map;


/**
provider={PROVIDER_GOOGLE}
customMapStyle={mapStyle}
*/