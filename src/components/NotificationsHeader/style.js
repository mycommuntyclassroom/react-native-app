import { deviceDimensions } from '../../styles';
import styleVariables from '../../styles/variables'

const NotificationsHeader = {};

NotificationsHeader.container = {
  padding: 20,
  paddingTop: 30,
  paddingBottom: 15,
  display: 'flex',
  flexDirection: 'row'
}

NotificationsHeader.headerTabs = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  left: deviceDimensions.deviceWidth / 15,
  backgroundColor: styleVariables.transparentBlack,
  padding: 4,
  paddingLeft: 13,
  paddingRight: 13,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center'
}

NotificationsHeader.notificationsText = {
  color: 'white',
  fontSize: 13,
  marginRight: 5
}

export default NotificationsHeader;