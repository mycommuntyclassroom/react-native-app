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

EventTeaser.teaserImage = {
  width: deviceWidth - 40,
  height: 200
}

EventTeaser.addEventContainer = {
  zIndex: 2
}

EventTeaser.editItem = {
  position: 'absolute',
  right: 6,
  bottom: -15,
  zIndex: 2
}

EventTeaser.addItem = {
  position: 'absolute',
  right: 56,
  bottom: -15,
  zIndex: 2
}

EventTeaser.addCopy = {
  color: 'white',
  fontSize: 7,
}

EventTeaser.eventView = {
  paddingTop: 13
}

EventTeaser.eventTitle = {
  fontSize: 16,
  color: styleVariables.mc2fontGray
}

EventTeaser.eventTags = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5
}

EventTeaser.tagItemCopy = {
  color: styleVariables.mc2medGray,
  marginRight: 20
}

EventTeaser.eventDays = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: 5
}

EventTeaser.eventDay = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  color: styleVariables.mc2Turquoise,
  fontSize: 17,
  fontWeight: '500'
}


export default EventTeaser;