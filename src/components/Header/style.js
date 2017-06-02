import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const HEADER = {};

/* Header Styles */

HEADER.container = {
  paddingTop: 30,
  height: 93,
  backgroundColor: variables.mc2PowderBlue
}

HEADER.baseHeader = {
  display: 'flex',
  flexDirection: 'row',
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