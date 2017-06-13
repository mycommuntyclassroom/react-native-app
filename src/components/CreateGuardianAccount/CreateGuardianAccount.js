import React, { Component } from 'react';
import { updateProfile } from '../../helpers/form';
import { database } from '../../helpers/firebase';
import actions from '../../redux/actions';
import store from '../../redux/store';

import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ScrollView
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import style from './style';
import CheckBox from '../CheckBox';
import Button from '../Button';

// import BackButton from '../components/BackButton';

class CreateGuardianAccount extends Component {

  constructor(props) {
    super();

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

    this.toTitleCase=this.toTitleCase.bind(this);
    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }

  /**
   *
   * @param e
   */


  capitalizeWord(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  handleChange(value, fieldName) {
    let inputObj = {}
    inputObj[fieldName] = value;
    this.setState(inputObj);
  }

  checkboxChange(checkbox, checkboxOptions, checked) {
    // current array of options
    const options = this.state[ checkboxOptions ];
    let index;

    // check if the check box is checked or unchecked
    if (checked) {
      // add the numerical value of the checkbox to options array
      options.push(checkbox)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(checkbox)
      options.splice(index, 1)
    }

  }

  radioButtonChange(value, group) {
    // current array of options
    let radioButtonGroup = group
    let radio = value

    const newState = {}
    newState[radioButtonGroup] = radio

    // update the state with the new array of options
    this.setState(newState);

  }

  /**
   *
   * @param e
   */
  submitForm() {
    const props = this.props;
    const { app } = props;
    const data = {...this.state};

    // update the store with the information the user submitted
    store.dispatch(
      actions.newAccountCreated(data)
    );

    // update the database - path, data
    updateProfile(`guardians/${data.uid}`, data);

    // navigate to the tutorial page
    app.goToScene('Tutorial', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props
    const { globalStyles } = props;
    let formData = this.state.formData || {};
    const { displayName } = props.auth

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category} style={style.checkboxContainer}>
            <Text style={style.subTitle}>{this.capitalizeWord(category)}</Text>
            {formData[category].map(item => {
              return ( 
                <View key={item}>
                  <CheckBox
                    label={item}
                    key={item}
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
                  />
                </View>
              )
            })}
          </View>
        )
      }
      return checkboxOutput
    }

    // set the data structure for the radio buttons
    const radio_props = [
      {label: 'Male', value: 'male' },
      {label: 'Female', value: 'female' }
    ];
    let userGender = this.state.gender
        // <BackButton path="/welcome-search" />

    return(
      <ScrollView>
        <Text style={[style.title]}> Help us get to know you... </Text>
        <View style={style.formContainer}>
          <TextInput
            style={globalStyles.textInput}
            placeholderTextColor='white'
            placeholder='Your Name'
            onChangeText={ (value) => this.handleChange(value, 'displayName') } 
          />

          <View>
            <RadioForm
              radio_props={radio_props}
              initial={userGender === 'male' ? 0 : 1 }
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          <View>
            <Text style={style.subTitle}>Address</Text>
            <TextInput 
              style={globalStyles.textInput}
              placeholderTextColor='white'
              placeholder="Street Address"
              onChangeText={ (value) => this.handleChange(value, 'street') } />
            <View className="no-wrap">
              <View>
                <TextInput
                  style={globalStyles.textInput}
                  placeholderTextColor='white'
                  placeholder="City"
                  onChangeText={ (value) => this.handleChange(value, 'city') } />
              </View>
              <View>
                <TextInput
                  style={globalStyles.textInput}
                  placeholderTextColor='white'
                  placeholder="State"
                  onChangeText={ (value) => this.handleChange(value, 'state') } />
              </View>
              <View>
                <TextInput name="zipCode"
                  style={globalStyles.textInput}
                  placeholderTextColor='white'
                  placeholder="Zipcode"
                  onChangeText={ (value) => this.handleChange(value, 'Zipcode') } />
              </View>
            </View>
          </View>

          { outputCheckboxes() }

          <Button text='Submit' extraStyle={style.submit} onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default CreateGuardianAccount;
