import React, { Component } from 'react';
import { addChildProfile, removeItem } from '../helpers/form';
import { database } from '../helpers/firebase';
import actions from '../redux/actions';
import store from '../redux/store';

import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ScrollView
} from 'react-native';

import CheckBox from './CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Button from '../components/Button';

// import BackButton from '../components/BackButton';

class CreateChildAccount extends Component {

  constructor(props) {
    super();

    console.log('CreateChildAccount REndered')
    // 
    // STATE OBJECT
    // 
    this.state={};

    // clear the old formData
    AsyncStorage.removeItem('formData');

    const { auth } = props.app.props;

    // pull the formData tree from the DB and grab all of the checkboxes for the guardians
    database
    .ref('formData/children')
    .once('value')
    .then((snapshot) => {
      console.log('Here is the Snapshot for the formData: ', snapshot.val())
      // setup the state properties

      let categories = {
        gid: auth.uid,
        fName: '',
        lName: '',
        profileImage: '../../../images/blank-profile-pic.png',
        gender: null,
        uploadProgress: null
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

  /**
   *
   * @param e
   */
  submitForm() {
    console.log('submitForm CALLED');
    
    const props = this.props;
    const { app } = props;
    const { fName, lName } = this.state;
    // gather the child's info from the state
    const newChild = {...this.state};
    // create a temporary id for the new child
    const tempNewChildID = `${fName}${lName}`;

    // get the user
    let parent = app.props.user;
    // get the users group of children
    let userChildren = parent.children || {};

    // if this is the first time the user is adding children, remove the empty placeholder
    if (userChildren[0] == ' ') {
      // remove the placeholder from the DB
      removeItem(`guardians/${newChild.gid}/children/0`)
      // remove the placeholder locally
      delete userChildren['0'];
    }

    // create a copy of the user's children
    const updatedUserChildren = Object.assign(userChildren);

    // add the new child to the user's children
    updatedUserChildren[tempNewChildID] = newChild;

    // pass the user with the updated children to the store
    const updatedUser = Object.assign(parent, updatedUserChildren);
    store.dispatch(actions.handleChildProfile(updatedUser));

    // update the database
    addChildProfile(newChild);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props
    let formData = this.state.formData || {};
    const { displayName, email, imageName } = this.props.auth;

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category}>
            <Text>{category}</Text>
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
        <Text> Add your child here! </Text>
        <View>
          <TextInput
            style={{width: 200, height: 40}}
            placeholder='First Name'
            onChangeText={ (value) => this.handleChange(value, 'fName') } 
          />

          <TextInput
            style={{width: 200, height: 40}}
            placeholder='Last Name'
            onChangeText={ (value) => this.handleChange(value, 'lName') } 
          />

          <View>
            <RadioForm
              radio_props={radio_props}
              initial={userGender === 'male' ? 0 : 1 }
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          { outputCheckboxes() }

          <Button text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default CreateChildAccount;
