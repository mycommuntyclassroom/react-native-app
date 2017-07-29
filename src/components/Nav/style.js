import styleVariables from '../../styles/variables';
import { deviceDimensions } from '../../styles';
const { deviceWidth, deviceHeight } = deviceDimensions;

const Nav = {};

Nav.container = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: 100,
  height: deviceHeight - 90,
  width: '75%',
  bottom: 0,
  backgroundColor: styleVariables.mc2fontGray
}

Nav.navLink = {
  height: 50,
  backgroundColor: 'transparent'
};

export default Nav;