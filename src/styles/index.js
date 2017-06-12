import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import variables from './variables';

// save device dimensions
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const deviceDimensions = {
  deviceWidth,
  deviceHeight
}

const STYLE = {};

/* Global styles */

STYLE.fullscreen = {
  flex: 1
};

STYLE.deviceWidth = {
  width: deviceWidth
}

STYLE.deviceHeight = {
  height: deviceHeight
}

STYLE.loader = {
  flex: 1,
  height: 80,
  position: 'absolute'
};

STYLE.container = {
  flex: 1,
  // justifyContent: 'space-between',
  paddingTop: 20
};

STYLE.title = {
  fontSize: 30
};

STYLE.text = {
  fontSize: 16
};

/* Components */

STYLE.Button = {
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  padding: 10,
  borderRadius: 15
};

STYLE.ButtonText = {
  backgroundColor: 'transparent',
  color: 'white',
  textAlign: 'center',
  fontWeight: '500'
};

STYLE.Nav = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: 100,
  height: '100%',
  width: '75%',
  top: 0,
  backgroundColor: 'blue'
};

STYLE.NavText = {
  color: 'white'
};

STYLE.NavLink = {
  height: 50
};

export default StyleSheet.create(STYLE);
