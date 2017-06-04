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

    this.state={}

    console.log('EditGuardianAccount CALLED!!!')

    // pull the formData tree and grab all of the checkboxes for the guardians
    // and save it in local storage
    database.ref('formData/guardians')
            .once('value')
            .then((snapshot) => {
              // store the formData in the state
              this.setState({formData: snapshot.val()});
            }) 

    const { 
            uid, displayName, profileImage, photoURL, 
            street, city, zipCode, gender, state
          } = props.user;

    const userImage = profileImage || photoURL;

    // build the state object with the key values in the props
    let newStateObject = {
      uid,
      displayName,
      profileImage: userImage,
      street,
      city,
      zipCode,
      gender,
      state,
      uploadProgress: null
    }

    let formData = this.state.formData || {}

    console.log('this is the formData: ', formData)

    // gather all of the checkbox categories and pass them to the state (categories) object
    const checkBoxCategories = () => {
      for (var category in formData) {
        // add a new property to the newStateObject
        // with the name of each checkbox group name and its checked fields
        let categoryArray = props.user[category] || [];
        console.log('categoryArray: ', categoryArray)
        let newCategoryArray = categoryArray.slice();
        console.log('newCategoryArray: ', newCategoryArray)
        newStateObject[category] = newCategoryArray;
      }
    }

    checkBoxCategories();

    // 
    // STATE OBJECT
    // 
    // init an empty obj for the state, the props for the state
    // will be set in componentWillReceiveProps()
    // 
    console.log('here are the props: ', props)
    this.setState(newStateObject);

    // Bound functions
    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);

    // FILE UPLOAD
    console.log('FILE UPLOAD Reached')
    // this.userRef = database.ref(`guardians/${props.auth.uid}`);
    // this.storageRef = storage.ref(`user-images/${props.auth.uid}/guardian`);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    console.log('FILE UPLOAD Passed')
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

  checkboxChange(e) {
    console.log('checkboxChange CALLED')
    // current array of options
    let checkboxOptions = e.target.name;

    let checkbox = e.target.value;
    const options = this.state[ checkboxOptions ];
    let index;

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
    console.log('HERE is the State afterwards: ', this.state)
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
    const { uid, displayName, profileImage } = app.props.user;
    const { uploadProgress } = this.state;
    // grab the form data set within the state
    let formData = this.state.formData || {};

    console.log('formData: ', formData)

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
              console.log('this.state[`${category}`]', this.state[`${category}`] )
              var checkbox = '';
              // pre-check any items that were selected and saved
              if (this.state.formData[`${category}`].indexOf(item) > -1) {
                checkbox = 
                  <CheckBox
                    label={item}
                    checked={true}
                    key={item}
                    // using '!checked' to force a truthy value, this seems to be an issue with the component 
                    onChange={(checked) => this.checkboxChange(item, category, !checked) }
                  />
              } else {
                checkbox = 
                  <CheckBox
                    label={item}
                    key={item}
                    // using '!checked' to force a truthy value, this seems to be an issue with the component 
                    onChange={(checked) => this.checkboxChange(item, category, !checked) }
                  />
              }

              return checkbox;

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

        <View>
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
              onPress={(value) => { this.radioButtonChange }}
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
