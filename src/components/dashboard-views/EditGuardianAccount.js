import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

import CheckBox from 'react-native-checkbox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Button from '../Button';

import { updateProfile } from '../../helpers/form';
import { storage, database } from '../../helpers/firebase';
import PageLoader from '../PageLoader/PageLoader';
import actions from '../../redux/actions';
import store from '../../redux/store';

class EditGuardianAccount extends Component {

  constructor(props) {
    super(props);

    console.log('EditGuardianAccount CALLED!!!')
    // const userImage = profileImage || photoURL;

    // 
    // STATE OBJECT
    // 
    // init an empty obj for the state, the props for the state
    // will be set in componentWillReceiveProps()
    // 
    this.state={};

    // bind functions
    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps called, nextProps: ', nextProps);
    const { app } = nextProps;

    console.log('thie is the APP data: ', app)

    const { 
            uid, displayName, profileImage, specialties, 
            street, city, zipCode, gender, state
          } = app.props.user;

    // build the state object with the key values in the props
    let newStateObject = {
      uid,
      displayName,
      profileImage,
      street,
      city,
      zipCode,
      gender,
      specialties,
      state,
      uploadProgress: null
    };

    // pull the formData tree and grab all of the checkboxes for the guardians
    // and save it in the state
    database
    .ref('formData/guardians')
    .once('value')
    .then((snapshot) => {
      // store the formData in the state
      console.log('*!*!*!*!* firebase call returned *!*!*!*!')
      this.setState({formData: snapshot.val()});

      let formData = snapshot.val() || {}

      // gather all of the checkbox categories and pass them to the state (categories) object
      console.log('componentWillReceiveProps checkBoxCategories Called')
      for (var category in formData) {
        console.log('formData within the checkBoxCategories func: ', formData);
        console.log('this is the newStateObject WITHIN the checkBoxCategories func: ', newStateObject);
        // add a new property to the newStateObject
        // with the name of each checkbox group name and its checked fields
        let categoryArray = props.user[category] || [];
        console.log('categoryArray: ', categoryArray)
        let newCategoryArray = categoryArray.slice();
        console.log('newCategoryArray: ', newCategoryArray)
        newStateObject[category] = newCategoryArray;
      }
    })

    // update the state after the render
    this.setState(newStateObject)
    console.log('this is the state obj after the insertion: ', this.state);
  }

  handleFileUpload(event) {
    // const file = event.target.files[0];
    // const uploadTask = this.storageRef.child(file.name)
    //                                   .put(file, { contentType: file.type });

    // uploadTask.on('state_changed', (snapshot) => {
    //   const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   this.setState({ uploadProgress });
    // });

    // uploadTask.then((snapshot) => {
    //   this.userRef.update({
    //     profileImage: snapshot.downloadURL
    //   });
    //   this.setState({ 
    //     uploadProgress: null,
    //     profileImage: snapshot.downloadURL
    //   });
    // });
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

  checkboxChange(checkbox, checkboxOptions, checked) {
    // current array of options
    console.log('this is the checkboxChange state: ', this.state)
    const options = this.state.specialties;
    console.log('This is the checkboxChange options: ', this.state.specialties);
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
  submitForm(e) {
    console.log('SUBMIT form called')
    e.preventDefault();
    const data = {...this.state};
    // console.log('this is the submit data: ', data);
    console.log('this is the submit data: ', data);

    console.log('here are the component props: ', this.props);


    // update the store, create a new user object with the profile info in it
    console.log('this is the current user Obj: ', this.props.user);
    console.log('this is the current state: ', data);
    const newUserObject = this.props.user;

    console.log('here is the newUserObject: ', newUserObject)

    const updatedUser = Object.assign(newUserObject, data)

    console.log('here is the updatedUser: ', updatedUser)

    // pass the updated object to the store
    store.dispatch(actions.userInfo(updatedUser));

    // update the database - path, data
    updateProfile(`guardians/${data.uid}`, data);

    // navigate to the dashboard
    browserHistory.push('/dashboard');
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    console.log('Reached the RENDER, props: ', this.props)
    const props = this.props;
    const { app } = props
    const userObj = app.props.user
    const { uid, displayName, profileImage } = userObj;
    const { uploadProgress } = this.state;
    const userSpecialties = userObj.specialties

    // grab the form data set within the state
    let formData = this.state.formData || {};

    console.log('formData: ', formData)
    console.log('this is the RENDER STATE: ', this.state)

    const outputCheckboxes = () => {
      console.log('outputCheckboxes Called ');
      // skip this function if the state doesn't have basic info
      console.log('this is the uid: ', uid);
      if (uid === null) { return }
      console.log('guard PASSED')
      let checkboxOutput = [];
      for (var category in formData) {
        console.log('this is the category: ', category)
        checkboxOutput.push(
          <View key={category}>
            <Text>{category}</Text>
            {formData[category].map(item => {
              console.log('checkbox inner called, item: ', item)
              console.log('this is the inner category: ', category)
              console.log('this is the state:', this.state )
              console.log('this.state[`${category}`]', this.state.formData[`${category}`] )
              var checkbox = '';
              // pre-check any items that were selected and saved
              if (userSpecialties.indexOf(item) > -1) {
                checkbox = 
                  <CheckBox
                    label={item}
                    checked={true}
                    key={item}
                    // using '!checked' to force a truthy value, this seems to be an issue with the component 
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
                  />;
              } else {
                checkbox = 
                  <CheckBox
                    label={item}
                    key={item}
                    // using '!checked' to force a truthy value, this seems to be an issue with the component 
                    onChange={(checked) => this.checkboxChange(item, category, !checked) }
                  />;
              }

              return checkbox;
              console.log('returned checkbox: ', checkbox);
            })}
          </View>
        )
      }
      return checkboxOutput
      console.log('checkboxOutput AFTER: ', checkboxOutput);
    }


    // set the data structure for the radio buttons
    const radio_props = [
      {label: 'Male', value: 'male' },
      {label: 'Female', value: 'female' }
    ];

    let userGender = this.state.gender
    let userImage = profileImage ? require(`${profileImage}`) : require('../../../images/blank-profile-pic.png');

    return(
      <ScrollView className="create-account">

        <Text> Editing Profile </Text>

        <View className="image-uploader">
          <View className="image-uploader--image-container">
            <Image 
              source={userImage} 
              className="image-uploader--photo"
              resizeMode='contain' 
              style={{width: '90%', height: 100}} />
          </View>
          <View className="image-uploader--identification">
            <Text>File Input</Text>
          </View>
        </View>

        <View style={{paddingBottom: 93}}>
          <TextInput
            style={{height: 50}}
            name="displayName"
            type="text"
            value={ this.state.displayName }
            onChange={ this.handleChange } />

          <View>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          <View className="address">
            <Text>Address</Text>
            <TextInput
              style={{height: 50}}
              name="street"
              type="text"
              placeholder="Street Address"
              value={ this.state.street }
              onChange={ this.handleChange }
            />
            <View className="no-wrap">
              <View>
                <TextInput
                  style={{height: 50}}
                  name="city"
                  type="text"
                  placeholder="City"
                  value={ this.state.city }
                  onChange={ this.handleChange } 
                />
              </View>
              <View>
                <TextInput
                  style={{height: 50}}
                  className="state-field"
                  name="state"
                  type="text"
                  placeholder="State"
                  value={ this.state.state }
                  onChange={ this.handleChange } 
                />
              </View>
              <View>
                <TextInput
                  style={{height: 50}}
                  name="zipCode"
                  type="text"
                  placeholder="Zipcode"
                  value={ this.state.zipCode }
                  onChange={ this.handleChange } 
                />
              </View>
            </View>
          </View>

          { outputCheckboxes() }

          <Button text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default EditGuardianAccount;
