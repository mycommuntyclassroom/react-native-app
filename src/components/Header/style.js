import { StyleSheet } from 'react-native';

const HEADER = {};

/* Header Styles */

HEADER.baseHeader = {
  display: 'flex',
  width: '100%',
  maxWidth: '100%',
  minHeight: 73,
  backgroundColor: 'blue'
}

HEADER.baseLogo = {
  padding: 0,
  margin: 0,
  width: '20%'
}

HEADER.img ={
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 5,
  paddingRight: 5
}

HEADER.navHolder = {
  backgroundColor: '#5C6874',
  zIndex: 10,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '70%',
  height: '100%'
}

export default StyleSheet.create(HEADER);