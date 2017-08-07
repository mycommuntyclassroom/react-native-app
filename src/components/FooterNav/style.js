import styleVariables from '../../styles/variables';
import { deviceDimensions } from '../../styles';
const { deviceWidth, deviceHeight } = deviceDimensions;

const FooterNav = {};

FooterNav.container = {
  position: 'absolute',
  bottom: 0,
  shadowColor: 'rgba(51, 51, 112, 0.2)',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 1,
  zIndex: 2
}

FooterNav.footerNav = {
  display: 'flex',
  flexDirection: 'row',
}

FooterNav.footerLink = {
  position: 'relative',
  display: 'flex',
  width: '19.5%',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: styleVariables.mc2lightGray,
  borderRightWidth: 1,
  zIndex: 2
}

FooterNav.footerLinkCopy = {
  fontSize: 8,
  padding: 5,
  paddingRight: 4,
  paddingLeft: 4,
  textAlign: 'center',
  alignItems: 'center',
  color: styleVariables.mc2fontLightGray
}

FooterNav.browseHostsButton = {
  // position: 'relative',
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  zIndex: 2
}

FooterNav.browseHostsLink = {
  width: '22%',
  borderRadius: 3,
  borderColor: styleVariables.mc2lightGray,
  borderRightWidth: 1,
  position: 'relative',
  top: -4,
  borderTopColor: '#fdfdfd',
  borderTopWidth: 10,
  zIndex: 2
}

FooterNav.decoCurve = {
  position: 'absolute',
  height: 65,
  top: -20,
  shadowColor: 'rgba(51, 51, 112, 0.2)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  width: '23.15%',
  left: (deviceWidth / 2) - ((deviceWidth * 0.2315) / 2),
  borderRadius: 30,
  zIndex: -1
}

FooterNav.notificationsBubble = {
  position: 'absolute',
  right: 25,
  top: -2,
  width: 18,
  height: 18,
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: 9
}

export default FooterNav;