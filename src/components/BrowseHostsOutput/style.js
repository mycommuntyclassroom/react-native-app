import styleVariables from '../../styles/variables';
import { deviceDimensions } from '../../styles';
const { deviceWidth, deviceHeight } = deviceDimensions;

const BrosweHosts = {};

BrosweHosts.container = {
  backgroundColor: 'white'
  }

BrosweHosts.teaserContainer = {
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: styleVariables.mc2purpleElectric,
  width: deviceWidth - 40,
  height: 200
}

BrosweHosts.eventView = {
  position: 'absolute',
  width: '100%',
  paddingLeft: 4,
  paddingBottom: 2,
  backgroundColor: 'transparent',
  bottom: 0
}

BrosweHosts.title = {
  color: 'white',
  fontSize: 16,
  fontWeight: '500'
}

BrosweHosts.tags = {
  display: 'flex',
  flexDirection: 'row',
}

BrosweHosts.bulletAndTagItem = {
  display: 'flex',
  marginRight: 18,
  flexDirection: 'row',
  alignItems: 'center'
}

BrosweHosts.bullet = {
  width: 5,
  height: 5,
  borderRadius: 2.5,
  marginRight: 3,
  backgroundColor: 'white'
}

BrosweHosts.tagItem = {
  color: 'white',
  fontSize: 12
}

BrosweHosts.dayAndTime = {
  display: 'flex',
  flexDirection: 'row'
}

BrosweHosts.days = {
  display: 'flex',
  flexDirection: 'row',
  marginRight: 3
}

BrosweHosts.dayText = {
  color: styleVariables.mc2LightBlue,
  fontWeight: '500',
  lineHeight: 16,
  fontSize: 16
}

BrosweHosts.time = {
  alignItems: "flex-end",
  justifyContent: "flex-end"
}

BrosweHosts.timeText = {
  color: 'white',
  fontSize: 12
}

BrosweHosts.hostName = {
  position: 'absolute',
  top: 5,
  left: 5,
  backgroundColor: styleVariables.mc2BlueElectric,
  padding: 5,
  borderRadius: 3,
  zIndex: 2
}

BrosweHosts.hostNameText = {
  color: 'white',
  fontWeight: '500'
}

BrosweHosts.teaserImage = {
  width: deviceWidth - 40,
  height: 200
}

BrosweHosts.requestFriendButton = {
  position: 'absolute',
  right: 9,
  bottom: 0,
  zIndex: 1
}

BrosweHosts.childDropOff = {
  position: 'absolute',
  borderRadius: 25,
  right: 55,
  bottom: 17,
  zIndex: 1
}


export default BrosweHosts;