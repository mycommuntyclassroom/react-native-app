import styleVariables from '../../styles/variables'

const WelcomePage = {};


WelcomePage.container = {
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingRight: 15,
  paddingLeft: 15
}

WelcomePage.logo = {
  width: 90, 
  height: 130,
  marginTop: 25,
  marginBottom: 10,
  shadowColor: 'rgba(51,51,112,.4)',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 1,
  shadowRadius: 4
}

WelcomePage.title = {
  color: 'white'
}

WelcomePage.copy = {
  display: 'flex',
  color: 'white',
  marginTop: 10,
  textAlign: 'center',
  marginBottom: 30
}

WelcomePage.zipCode = {
  backgroundColor: 'rgba(0,0,0, 0.3)',
  padding: 20,
  textAlign: 'center',
  color: 'white',
  zIndex: 1
}

WelcomePage.button = {
  width: '100%'
}

WelcomePage.welcomeImage = {
  height: 200,
  width:'100%',
  marginBottom: 50,
  marginTop: -40
}

WelcomePage.signIn = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 60
}

WelcomePage.signInLink = {
  marginLeft: 1,
  color: 'white'
}

WelcomePage.signInCopy = {
  color: styleVariables.mc2fontGray
}


export default WelcomePage;