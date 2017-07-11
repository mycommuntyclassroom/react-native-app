import styleVariables from '../../styles/variables';

const FooterNav = {};

FooterNav.footerNav = {
  display: 'flex',
  flexDirection: 'row',
  shadowColor: 'rgba(51, 51, 112, 0.2)',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 1
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
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'green',
  zIndex: 2
}

FooterNav.browseHostsLink = {
  width: '22%',
  borderRadius: 3,
  borderColor: styleVariables.mc2lightGray,
  borderRightWidth: 1,
  position: 'relative',
  top: -3,
  borderTopColor: '#fdfdfd',
  borderTopWidth: 5,
  zIndex: 2
}

FooterNav.decoCurve = {
  position: 'absolute',
  height: 75,
  top: -27,
  shadowColor: 'rgba(51, 51, 112, 0.6)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  width: 84,
  left: 145,
  borderRadius: 30,
  zIndex: -1
}

export default FooterNav;