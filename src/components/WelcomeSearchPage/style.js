import styleVariables from '../../styles/variables'

const WelcomeSearch = {};


WelcomeSearch.container = {
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingRight: 15,
  paddingLeft: 15
}

WelcomeSearch.headerIcon = {
  width: 90, 
  height: 130,
  marginTop: 25
}

WelcomeSearch.title = {
  color: 'white',
  marginBottom: 10
}

WelcomeSearch.copy = {
  display: 'flex',
  color: 'white',
  marginTop: 10,
  textAlign: 'center',
  marginBottom: 30
}

WelcomeSearch.zipCode = {
  backgroundColor: 'rgba(0,0,0, 0.3)',
  padding: 20,
  textAlign: 'center',
  color: 'white',
  zIndex: 1
}

WelcomeSearch.button = {
  width: '100%'
}

WelcomeSearch.welcomeImage = {
  height: 250,
  width:'100%',
  marginBottom: 50
}

WelcomeSearch.signIn = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 40
}

WelcomeSearch.signInLink = {
  marginLeft: 1,
  color: 'white'
}

WelcomeSearch.signInCopy = {
  color: styleVariables.mc2fontGray
}


export default WelcomeSearch;