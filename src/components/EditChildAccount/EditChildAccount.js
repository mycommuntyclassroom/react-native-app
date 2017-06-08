import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

import CheckBox from '../CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Button from '../Button';

import { updateProfile } from '../../helpers/form';
import { storage, database } from '../../helpers/firebase';
import PageLoader from '../PageLoader/PageLoader';
import actions from '../../redux/actions';
import store from '../../redux/store';

class EditChildAccount extends Component {

  constructor(props) {
    super(props);

    console.log('EditChildAccount CALLED!!!')

    // child's id
    const { childId } = props;
    const { app } = props;
    console.log('thie is the APP data: ', app)
    const child = app.props.user.children[childId];

    console.log('This is the Child: ', child)
    const { 
            gid, fName, lName, profileImage, gender, allergies
          } = child;

    // build the state object with the key values in the props
    let newStateObject = {
      gid,
      fName,
      lName,
      profileImage,
      gender,
      allergies,
      uploadProgress: null
    }

    // set the state
    this.state = newStateObject;

    console.log('this is the newStateObject: ', newStateObject)

    // pull the formData tree and grab all of the checkboxes for the children
    // and save it in the state
    database
    .ref('formData/children')
    .once('value')
    .then((snapshot) => {
      // store the formData in the state
      console.log('*!*!*!*!* firebase call returned *!*!*!*!')
      this.setState({formData: snapshot.val()});
    })

    // bind functions
    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
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
  handleChange(value, fieldName) {
    console.log('handleChange CALLED| value and fieldName', `${value} | ${fieldName}`)
    let inputObj = {}
    inputObj[fieldName] = value;
    this.setState(inputObj);
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

  submitForm() {
    console.log('*!*!*!*!*!*!submitForm CALLED');
    const props = this.props;
    const { app } = props;
    const data = {...this.state};

    const currentUserObject = app.props.user;
    console.log('here is the currentUserObject: ', currentUserObject)
    const updatedUser = Object.assign(currentUserObject, data)
    console.log('here is the updatedUser: ', updatedUser)

    // pass the updated object to the store
    store.dispatch(actions.userInfo(updatedUser));

    // update the database
    updateProfile(data);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    console.log('Reached the RENDER, state: ', this.state)
    const props = this.props;
    const { app } = props
    const currentChild = this.state
    const { gid, fName, lName, gender, profileImage, uploadProgress } = currentChild;
    const userSpecialties = currentChild.allergies

    // grab the form data set within the state
    let formData = this.state.formData || {};

    console.log('formData: ', formData)
    console.log('this is the RENDER STATE: ', this.state)

    const outputCheckboxes = () => {
      console.log('outputCheckboxes Called ');
      // skip this function if the state doesn't have basic info
      console.log('this is the gid: ', gid);
      if (gid === null) { return }
      console.log('guard PASSED')
      console.log('formData: ', formData)
      let checkboxOutput = [];
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category}>
            <Text>{category}</Text>
            {formData[category].map(item => {
              var checkbox = '';
              // pre-check any items that were selected and saved
              if (userSpecialties.indexOf(item) > -1) {
                checkbox = 
                  <CheckBox
                    label={item}
                    checked={true}
                    key={item}
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
                  />;
              } else {
                checkbox = 
                  <CheckBox
                    label={item}
                    key={item}
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
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

    // handle the output of the required image
    let userImage = profileImage != '../../../images/blank-profile-pic.png'
      ? {uri: profileImage} 
      : require('../../../images/blank-profile-pic.png');

    return(
      <ScrollView className="edit-account">

        <Text> {`Updating ${fName}'s Profile`} </Text>

        <View className="image-uploader">
          <View className="image-uploader--image-container">
            <Image 
              source={userImage} 
              className="image-uploader--photo"
              resizeMode='contain' 
              style={{width: 100, height: 100}} />
          </View>
          <View className="image-uploader--identification">
            <Text>File Input</Text>
          </View>
        </View>

        <View style={{paddingBottom: 93}}>
          <TextInput
            style={{height: 50}}
            name="fName"
            defaultValue={ this.state.fName }
            onChangeText={ (value) => this.handleChange(value, 'fName') } />

          <TextInput
            style={{height: 50}}
            name="lName"
            defaultValue={ this.state.lName }
            onChangeText={ (value) => this.handleChange(value, 'lName') } />

          <View>
            <RadioForm
              radio_props={radio_props}
              initial={gender === 'male' ? 0 : 1 }
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

export default EditChildAccount;
