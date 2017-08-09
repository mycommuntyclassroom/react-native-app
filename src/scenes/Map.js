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
      <View style={[globalStyles.container, { backgroundColor: 'burlywood' }]}>
        <Text style={globalStyles.title}>
          <MapView
            style={StyleSheet.absoluteFill}
          >
          </MapView>
        </Text>
      </View>
    );
  };

}

export default Map;


/**
provider={PROVIDER_GOOGLE}
customMapStyle={mapStyle}
*/