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

      // stringify the snapshot and save it as formData in the AsyncStorage 
      AsyncStorage.setItem('formData', JSON.stringify(snapshot.val()))

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
  
  async getCache(key){
    try{
        let value = await AsyncStorage.getItem('formData');
        return value.json();
    }
    catch(e){
        console.log('caught error', e);
        // Handle exceptions
    }
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    console.log('Here are the props passed in CREAT G-acct: ', this.props)
    console.log('This is the AsyncStorage.getItem(formData): ', AsyncStorage.getItem('formData'));

    jsonFormData =  getCache();
    console.log('jsonFormData: ', jsonFormData);
    let formData
    AsyncStorage.getItem('formData')
      ? formData = JSON.parse(AsyncStorage.getItem('formData'))
      : formData = {}
    
    const { displayName } = this.props.auth

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category} onChange={ this.checkboxChange }>
            <h3>{category}</h3>
            {formData[category].map(item => {
              return ( 
                <span key={item}>
                  <CheckBox
                    label='Label'
                    id={item}
                    name={category}
                    value={item}
                    checked={true}
                    onChange={(checked) => console.log('I am checked', checked)}
                  />
                  <Text htmlFor={item}>{item}</Text>
                </span>
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
      <div className="create-account">
        <h1> Help us get to know you... </h1>
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
                       maxLength="2"
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

          <input className="button"
                 type="submit"
                 name="submit"
                 value="Submit" />
          <Button text='Submit' onPress= { () => console.log('submit Button clicked') }></Button>
        </View>
      </div>
    )
  }
}

export default CreateGuardianAccount;
