import styleVariables from '../../styles/variables';
import { deviceDimensions } from '../../styles';

const { deviceWidth, deviceHeight } = deviceDimensions;

/* 
CirclesTeaser style 
*/

const CirclesTeaser = {};

CirclesTeaser.container = {
  display: 'flex',
  justifyContent: 'flex-start',
  backgroundColor: 'white',
  paddingTop: 15,
  paddingBottom: 15,
  borderBottomWidth: 1,
  borderColor: styleVariables.mc2medLightGray
}

CirclesTeaser.circleGroup = {
  display: 'flex',
  justifyContent: 'flex-start'
}

CirclesTeaser.title = {
  color: styleVariables.mc2fontBlue,
  marginBottom: 7,
  marginLeft: 8
}

CirclesTeaser.teaserElement = {
  width: 80,
  height: 80,
  borderRadius: 40,
  marginLeft: 8,
  borderColor: styleVariables.mc2lightGray,
  borderWidth: 1,
}

CirclesTeaser.addItem = {
  position: 'absolute',
  right: 10, 
  bottom: 30,
  zIndex: 2
}

CirclesTeaser.addItemText = {
  color: 'white',
  fontSize: 26
}

export default CirclesTeaser;