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
import PageLoader from '../PageLoader';
import actions from '../../redux/actions';
import store from '../../redux/store';

class EditGuardianAccount extends Component {

  constructor(props) {
    super(props);

    const { app } = props;
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
      gender: gender || '',
      specialties,
      state,
      uploadProgress: null
    };

    // update the state after the render
    this.state = newStateObject;

    // pull the formData tree and grab all of the checkboxes for the guardians
    // and save it in the state
    database
    .ref('formData/guardians')
    .once('value')
    .then((snapshot) => {
      // store the formData in the state
      this.setState({formData: snapshot.val()});

      let formData = snapshot.val() || {}

      // gather all of the checkbox categories and pass them to the state (categories) object
      // for (var category in formData) {
    
    
      //   // add a new property to the newStateObject
      //   // with the name of each checkbox group name and its checked fields
      //   let categoryArray = props.user[category] || [];
    
      //   let newCategoryArray = categoryArray.slice();
    
      //   newStateObject[category] = newCategoryArray;
      // }
    })

  

    // const userImage = profileImage || photoURL;

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
    let inputObj = {}
    inputObj[fieldName] = value;
    this.setState(inputObj);
  }

  checkboxChange(checkbox, checkboxOptions, checked) {
    // current array of options
    const options = this.state.specialties;
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

    const currentUserObject = app.props.user;
    const updatedUser = Object.assign(currentUserObject, data)

    // pass the updated object to the store
    store.dispatch(actions.userInfo(updatedUser));

    // update the database - path, data
    updateProfile(`guardians/${data.uid}`, data);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props;
    const { app } = props
    const userObj = app.props.user
    const { uid, displayName, profileImage } = userObj;
    const { uploadProgress } = this.state;
    const userSpecialties = userObj.specialties

    // grab the form data set within the state
    let formData = this.state.formData || {};

    const outputCheckboxes = () => {
      // skip this function if the state doesn't have basic info
      if (uid === null) { return }
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

    // handle the output of the required image
    let userImage = profileImage != '../../../images/blank-profile-pic.png'
      ? {uri: profileImage} 
      : require('../../../images/blank-profile-pic.png');

    return(
      <ScrollView className="create-account">

        <Text> Editing Profile </Text>

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
            name="displayName"
            defaultValue={ this.state.displayName }
            onChangeText={ (value) => this.handleChange(value, 'displayName') } />

          <View>
            <RadioForm
              radio_props={radio_props}
              initial={userGender === 'male' ? 0 : 1 }
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          <View className="address">
            <Text>Address</Text>
            <TextInput
              style={{height: 50}}
              type="text"
              placeholder="Street Address"
              defaultValue={ this.state.street }
              onChangeText={ (value) => this.handleChange(value, 'street') }
            />
            <View className="no-wrap">
              <View>
                <TextInput
                  style={{height: 50}}
                  name="city"
                  type="text"
                  placeholder="City"
                  defaultValue={ this.state.city }
                  onChangeText={ (value) => this.handleChange(value, 'city') } 
                />
              </View>
              <View>
                <TextInput
                  style={{height: 50}}
                  className="state-field"
                  name="state"
                  placeholder="State"
                  defaultValue={ this.state.state }
                  onChangeText={ (value) => this.handleChange(value, 'state') } 
                />
              </View>
              <View>
                <TextInput
                  style={{height: 50}}
                  name="zipCode"
                  type="text"
                  placeholder="Zipcode"
                  defaultValue={ this.state.zipCode }
                  onChangeText={ (value) => this.handleChange(value,'zipCode') } 
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
