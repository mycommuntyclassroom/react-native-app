import { StyleSheet } from 'react-native';

const STYLE = {};

/* Global */

STYLE.fullscreen = {
  flex: 1
};

STYLE.loader = {
  flex: 1,
  height: 80,
  position: 'absolute'
};

STYLE.container = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#eee'
};

STYLE.title = {
  fontSize: 30,
  marginTop: -150
};

STYLE.text = {
  fontSize: 16
};

/* Components */

STYLE.Button = {
  backgroundColor: 'purple',
  padding: 10,
  alignSelf: 'center'
};

STYLE.ButtonText = {
  backgroundColor: 'transparent',
  color: 'white',
  textAlign: 'center',
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
