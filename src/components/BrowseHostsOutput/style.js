import styleVariables from '../../styles/variables';
import { deviceDimensions } from '../../styles';
const { deviceWidth, deviceHeight } = deviceDimensions;

const BrosweHosts = {};

BrosweHosts.container = {
  backgroundColor: 'white',
  paddingBottom: 91 
  }

BrosweHosts.teaserContainer = {
  position: 'relative'
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

export default BrosweHosts;