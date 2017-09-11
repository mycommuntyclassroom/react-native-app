import React, { Component } from 'react';
import { updateProfile, capitalizeWord } from '../../helpers/form';
import { database } from '../../helpers/firebase';
import actions from '../../redux/actions';
import store from '../../redux/store';

import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  ScrollView
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import style from './style';
import colorsVariables from '../../styles/variables';
import CheckBox from '../CheckBox';
import BackButton from '../BackButton';
import Button from '../Button';
import PrivacyForm from '../privacyForm'
import { verifyAddress } from '../../helpers/validator'
import Toast, { DURATION } from 'react-native-easy-toast'
import { sendEmail } from '../../helpers/email'
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
        greeting: '',
        photoURL: auth.photoURL,
        email: auth.email,
        street: '',
        city: '',
        zipCode: '',
        children: [' '],
        gender: null,
        privacy: 'public'
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

  confirmAddress () {

    verifyAddress(this.state.street, this.state.city, this.state.state, this.state.zipCode).then((response) => {
      response.json().then(r => {
        let locationData = r.results[0];
        if (!locationData.partial_match && locationData.types.length > 0)
        {
          this.state.latlong = locationData.geometry.location;
          this.submitForm();
        }
        else {
          this.refs.toast.show('Address Validation failed! Address should be in USPS standardized format.' +
          'Please correct your address and try again!', 2500);
        }
        });
    })
      .catch((err) => {
        this.refs.toast.show('Uh Oh! Something went wrong. please try again!', DURATION.LENGTH_LONG);
      });
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
    app.goToScene('Tutorial', {app});

    // Send welcome email
    this.sendWelcomeMail(data);
  }

  getEmailBody (data) {
    return 'Hi ' + data.displayName +
      '\n Welcome to My Community Classroom!' +
      '\n Thank you for taking the time to register to be a part of a new growing educational community.' +
      'We are excited to have you on board as we build a platform that is dedicated to empowering families' +
      'and children by blowing open the doors to education as we strive to nurture our future citizens of the world!' +
      '\n PLEASE FLAG & SAVE THIS EMAIL – as it is a reminder of your login credentials should you ever need to reference it again.' +
      '\n \n Login : ' + data.email +
      '\n \n Please feel free to contact us at info@mobilecommunityclassroom.com with any questions or feedback you may have for us.' +
      '\n \n - The MC2 Founding Team'
      }

  sendWelcomeMail (data) {
    let emailBody = this.getEmailBody(data);
    sendEmail(data.email, "Welcome to MC2", emailBody).then((response) => {
    });
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
          <View key={category} style={[globalStyles.checkboxContainer, style.checkboxContainer]}>
            <Text style={globalStyles.checkboxSubTitle}>{capitalizeWord(category)}</Text>
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
        <Text style={[globalStyles.formTitle]}> Help us get to know you... </Text>
        <View style={style.formContainer}>
          <TextInput
            style={globalStyles.textInput}
            placeholderTextColor='white'
            placeholder='Your Name'
            onChangeText={ (value) => this.handleChange(value, 'displayName') } 
          />

          <TextInput
            style={[globalStyles.textInput, {height: 90}]}
            multiline = {true}
            numberOfLines = {6}
            placeholderTextColor='white'
            placeholder='Write a summary about yourself here'
            onChangeText={ (value) => this.handleChange(value, 'greeting') } 
          />

          <View>
            <RadioForm
              radio_props={radio_props}
              formHorizontal={true}
              buttonColor={colorsVariables.mc2BlueElectric}
              labelColor={'white'}
              initial={userGender === 'male' ? 0 : 1 }
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          <View>
            <Text style={globalStyles.formSubTitle}>Address</Text>
            <TextInput 
              style={globalStyles.textInput}
              placeholderTextColor='white'
              placeholder="Street Address"
              onChangeText={ (value) => this.handleChange(value, 'street') } />
            <View style={style.formAddress2ndRow}>
              <View style={globalStyles.formAddressItem}>
                <TextInput
                  style={globalStyles.textInput}
                  placeholderTextColor='white'
                  placeholder="City"
                  onChangeText={ (value) => this.handleChange(value, 'city') } />
              </View>
              <View style={[globalStyles.formAddressItem, globalStyles.formAddressCenterPiece]}>
                <TextInput
                  style={globalStyles.textInput}
                  placeholderTextColor='white'
                  placeholder="State"
                  onChangeText={ (value) => this.handleChange(value, 'state') } />
              </View>
              <View style={globalStyles.formAddressItem}>
                <TextInput name="zipCode"
                  style={globalStyles.textInput}
                  placeholderTextColor='white'
                  placeholder="Zipcode"
                  onChangeText={ (value) => this.handleChange(value, 'Zipcode') } />
              </View>
            </View>
          </View>

          { outputCheckboxes() }

          <PrivacyForm globalStyle={globalStyles} onChange={this.radioButtonChange} privacy={this.state.privacy}
                       title={'Default Event Privacy'}/>

          <Button text='Submit' extraStyle={style.submit} onPress= { () => this.confirmAddress() }></Button>
        </View>
        <Toast ref="toast" position='bottom' opacity={0.9} fadeOutDuration={500} textStyle={{
                fontSize:18,
                fontFamily: 'AvenirNext-Regular',
                fontWeight:'400',
                color:'white',
                textAlign:'center'
        }}/>
      </ScrollView>
    )
  }
}

export default CreateGuardianAccount;
