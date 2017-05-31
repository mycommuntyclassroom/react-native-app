import React, { Component } from 'react';
import { updateProfile } from '../helpers/form';
import { database } from '../helpers/firebase';
import actions from '../redux/actions';
import store from '../redux/store';

import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native';

import CheckBox from 'react-native-checkbox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Button from '../components/Button';

// import BackButton from '../components/BackButton';

class CreateGuardianAccount extends Component {

  constructor(props) {
    super();

    console.log('CreateGuardianAccount REndered')
    // 
    // STATE OBJECT
    // 
    this.state={};

    // clear the old formData
    AsyncStorage.removeItem('formData');

    const { auth } = props.app.props;

    // pull the formData tree from the DB and grab all of the checkboxes for the guardians
    database
    .ref('formData/guardians')
    .once('value')
    .then((snapshot) => {
      console.log('Here is the Snapshot for the formData: ', snapshot.val())
      // setup the state properties
      let categories = {
        uid: auth.uid,
        displayName: auth.displayName,
        photoURL: auth.photoURL,
        email: auth.email,
        street: '',
        city: '',
        zipCode: '',
        children: [' '],
        gender: null
      }

      // gather all of the checkbox categories and pass them to the state (categories) object
      const checkBoxCategories = () => {
        for (var category in snapshot.val()) {
          // add a new property to the categories object
          // with the name of each checkbox group name
          categories[category] = []
        }
      }
      checkBoxCategories();

      // store the formData in the state
      this.setState({formData: snapshot.val()})

      // UPDATE THE STATE
      this.setState(categories);

    }) 

    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }

  /**
   *
   * @param e
   */
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkboxChange(e) {
    // current array of options
    let checkboxOptions = e.target.name

    let checkbox = e.target.value
    const options = this.state[ checkboxOptions ]
    let index

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(checkbox)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(checkbox)
      options.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ checkboxOptions })
  }

  radioButtonChange(e) {
    // current array of options
    let radioButtonGroup = e.target.name
    let radio = e.target.value

    const newState = {}
    newState[radioButtonGroup] = radio

    // update the state with the new array of options
    this.setState(newState);

  }

  /**
   *
   * @param e
   */
  submitForm(e) {
    e.preventDefault();
    const data = {...this.state};

    // update the store with the information the user submitted
    store.dispatch(
      actions.newAccountCreated(data)
    );

    // update the database
    updateProfile(data);

    // navigate to the tutorial page
    // TODO:::: NAV for native
    // browserHistory.push('/tutorial');
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    console.log('Here are the props passed in CREAT G-acct: ', this.props)
    const props = this.props

    let formData = this.state.formData || {};

    console.log('HERE is the formData: ', formData);
    
    const { displayName } = props.auth

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category} onChange={ this.checkboxChange }>
            <Text>{category}</Text>
            {formData[category].map(item => {
              return ( 
                <View key={item}>
                  <CheckBox
                    label='Label'
                    id={item}
                    name={category}
                    value={item}
                    checked={true}
                    onChange={(checked) => console.log('I am checked', checked)}
                  />
                </View>
              )
            })}
          </View>
        )
      }
      return checkboxOutput
    }

    const radio_props = [
      {label: 'Male', value: 'male' },
      {label: 'Female', value: 'female' }
    ];
        // <BackButton path="/welcome-search" />

    return(
      <View>
        <Text> Help us get to know you... </Text>
        <View onSubmit={ this.submitForm } >
          <TextInput name="displayName"
                 type="text"
                 placeholder={displayName}
                 value={ this.state.displayName }
                 onChangeText={ this.handleChange } />

          <View onChange={ this.radioButtonChange }>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => { this.radioButtonChange }}
            />
          </View>

          <View className="address">
            <Text>Address</Text>
            <TextInput name="street"
                   type="text"
                   placeholder="Street Address"
                   value={ this.state.street }
                   onChangeText={ this.handleChange } />
            <View className="no-wrap">
              <View>
                <TextInput name="city"
                       type="text"
                       placeholder="City"
                       value={ this.state.city }
                       onChangeText={ this.handleChange } />
              </View>
              <View>
                <TextInput className="state-field"
                       name="state"
                       type="text"
                       placeholder="State"
                       value={ this.state.state }
                       onChangeText={ this.handleChange } />
              </View>
              <View>
                <TextInput name="zipCode"
                       type="text"
                       placeholder="Zipcode"
                       value={ this.state.zipCode }
                       onChangeText={ this.handleChange } />
              </View>
            </View>
          </View>

          { outputCheckboxes() }

          <Button text='Submit' onPress= { () => console.log('submit Button clicked') }></Button>
        </View>
      </View>
    )
  }
}

export default CreateGuardianAccount;
