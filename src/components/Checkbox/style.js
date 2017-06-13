import variables from '../../styles/variables';

const CheckBox = {};

CheckBox.container = {
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

export default CheckBox;