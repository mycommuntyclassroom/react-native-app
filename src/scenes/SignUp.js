import React, { Component } from 'react';
import { signInHandler } from '../helpers/user';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Button from '../components/Button';
import CreateGuardianAccount from '../components/CreateGuardianAccount';

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  submitForm(state) {
    console.log('submitForm CALLED')
    signInHandler('manual', 'CREATING_ACCOUNT', state);
  }

  render() {

    console.log('THESE are the props: ', this.props)
    const props = this.props;
    const { auth } = props.app.props;
    console.log('this.state in RENDER: ', this.state);
    // view for the sign up with your ('X') account
    const signUpView = (
      <View className="register-form">
        <Text> Sign up </Text>
        <TextInput
          style={{width: 200, height: 40}}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={{ width: 200, height: 40}}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button text='Search your area' onPress= { () => app.goToScene('Settings', {app}) }></Button>
        <Button text='Submit' onPress= { () => this.submitForm(this.state) }></Button>
      </View>
    );

    const { style, app } = this.props;
    return (
      <View style={[style.container, { justifyContent: 'flex-start', backgroundColor: 'green' }]}>
        { auth.status === 'SIGNED_IN' && app.goToScene('Dashboard', {app})}
        { auth.status === 'ANONYMOUS' && signUpView }
        { auth.status === 'CREATING_ACCOUNT' && <CreateGuardianAccount auth={auth} {...props} /> }
      </View>
    );
  };

}

export default SignUp;
