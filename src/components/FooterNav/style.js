import styleVariables from '../../styles/variables';

const FooterNav = {};

FooterNav.footerNav = {
  display: 'flex',
  flexDirection: 'row',
  shadowColor: 'rgba(51, 51, 112, 0.6)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1
}

FooterNav.footerLink = {
  position: 'relative',
  display: 'flex',
  width: '19.5%',
  alignItems: 'center',
  backgroundColor: 'red',
  zIndex: 2
}

FooterNav.footerLinkCopy = {
  fontSize: 8,
  padding: 8,
  textAlign: 'center',
  alignItems: 'center',
  color: styleVariables.mc2fontLightGray
}

FooterNav.browseHostsButton = {
  position: 'relative',
  zIndex: 2
}

FooterNav.browseHostsLink = {
  width: '22%'
}

FooterNav.decoCurve = {
  position: 'absolute',
  height: 75,
  top: -24,
  shadowColor: 'rgba(51, 51, 112, 0.6)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  width: '100%',
  borderRadius: 30,
  zIndex: 0
}

export default FooterNav;