import styleVariables from '../../styles/variables';
const LoginForm = {};

LoginForm.container = {
  display: 'flex',
  flex: 1,
  alignItems: 'center'
}

LoginForm.submit = {
  width: '100%',
  marginTop: 15
}

LoginForm.header = {
  color: 'white',
  marginBottom: 20
}

LoginForm.errorText = {
  color: 'red'
};

LoginForm.signIn = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 40
}

LoginForm.signInLink = {
  marginLeft: 1,
  color: 'white'
}

LoginForm.signInCopy = {
  color: styleVariables.mc2fontGray
}

export default LoginForm;