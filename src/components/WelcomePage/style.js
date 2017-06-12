import styleVariables from '../../styles/variables'

const WelcomePage = {};


WelcomePage.container = {
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingRight: 15,
  paddingLeft: 15
}

WelcomePage.logo = {
  width: 80, 
  height: 80,
  marginTop: 20
}

WelcomePage.title = {
  color: 'white',
  marginTop: 20
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
  marginBottom: 40,
  marginTop: -40
}

WelcomePage.signIn = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 30
}

WelcomePage.signInLink = {
  marginLeft: 1,
  color: 'white'
}

WelcomePage.signInCopy = {
  color: styleVariables.mc2fontGray
}


export default WelcomePage;