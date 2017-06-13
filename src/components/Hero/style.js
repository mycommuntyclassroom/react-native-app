import styleVariables from '../../styles/variables';

const hero = {};

hero.container = {
  backgroundColor: 'white'
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
  shadowColor: 'rgba(51,51,112,.4)',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 1,
}

hero.address = {
  color: 'white',
  fontSize: 12,
  textShadowOffset: {width: 1, height: 1}, 
  textShadowRadius: 3, 
  textShadowColor: 'rgba(0, 0, 0, 0.6)',
}

export default hero;