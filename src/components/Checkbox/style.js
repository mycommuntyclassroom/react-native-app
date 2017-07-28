import variables from '../../styles/variables';

const CheckBox = {};

CheckBox.container = {
  position: 'relative',
  borderRadius: 3,
  margin: 4
}

CheckBox.text = {
  color: 'white',
  padding: 10,
  paddingLeft: 14,
  paddingRight: 14
}

CheckBox.true = {
  backgroundColor: variables.mc2BlueElectric
}

CheckBox.false = {
  backgroundColor: 'rgba(0, 0, 0, 0.3)'
}

CheckBox.checkMark = {
  position: 'absolute', 
  opacity: 0, 
  fontSize: 80,
  color: variables.mc2purpleElectric,
  top: -10, 
  left:10, 
  zIndex: 1
}

CheckBox.visible = {
  opacity: 1
}

export default CheckBox;