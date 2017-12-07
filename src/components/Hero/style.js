import styleVariables from '../../styles/variables';
import { deviceDimensions } from '../../styles';

const { deviceWidth, deviceHeight } = deviceDimensions;

const hero = {};

hero.container = {
  position: 'relative'
}

hero.mainInfo = {
  position: 'absolute',
  paddingLeft: 15,
  paddingBottom: 40,
  bottom: 0,
  width: deviceWidth
}

hero.userName = {
  color: 'white',
  textShadowOffset: {width: 1, height: 1}, 
  textShadowRadius: 3, 
  textShadowColor: 'rgba(0, 0, 0, 0.4)',
  fontWeight: '500',
  fontSize: 25
}

hero.hr = {
  width: 45,
  height: 3,
  marginTop: 2,
  marginBottom: 13,
  marginLeft: 10,
  backgroundColor: styleVariables.mc2BlueElectric,
  shadowColor: 'rgba(51, 51, 112, 0.4)',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 1,
}

hero.addressContainer = {
  display: 'flex',
  flexDirection: 'row'
}

hero.address = {
  color: 'white',
  fontSize: 12,
  textShadowOffset: {width: 1, height: 1}, 
  textShadowRadius: 3, 
  textShadowColor: 'rgba(0, 0, 0, 0.6)',
}

hero.requestFriendButton = {
  position: 'absolute',
  right: 9,
  bottom: 0,
  zIndex: 1
}

hero.chatButton = {
  position: 'absolute',
  right: 69,
  bottom: 0,
  zIndex: 1
}

hero.chatIcon = {
  width: 35,
  height: 35
}

hero.edit = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute', 
  borderRadius: 22.5,
  height: 45,
  width: 45,
  right: 10, 
  bottom: 30,
  padding: 10,
  shadowColor: 'rgba(51, 51, 112, 0.6)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  zIndex: 2
}

hero.editText = {
  color: 'white'
}

hero.decoClip = {
  height: 70,
  width: deviceWidth + 20,
  backgroundColor: 'white',
  transform: [{ rotate: '-6deg'}],
  marginTop: -20,
  marginLeft: -2,
  marginBottom: -35
}

export default hero;