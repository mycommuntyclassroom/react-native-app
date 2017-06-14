import styleVariables from '../../styles/variables';
import { deviceDimensions } from '../../styles';

const { deviceWidth, deviceHeight } = deviceDimensions;

const EventTeaser = {};

EventTeaser.teaserContainer = {
  padding: 20,
  paddingLeft: 18,
  paddingRight: 0,
  backgroundColor: 'white'
}

EventTeaser.teaserElement = {
  
}

EventTeaser.teaserImage = {
  width: deviceWidth - 40,
  height: 200
}

EventTeaser.addItem = {
  position: 'absolute',
  right: 6,
  bottom: -15,
  zIndex: 2
}

EventTeaser.addCopy = {
  color: 'white',
  fontSize: 7,
}


export default EventTeaser;