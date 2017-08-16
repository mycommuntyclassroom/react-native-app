import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Image, TextInput, ScrollView } from 'react-native'
import style from './style'
import Button from '../Button'
import { sendEmail } from '../../helpers/email'

class InviteForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      addresses: '',
      message: 'Hi! \n \nPlease join me on MC2! It\'s the new educational marketplace specifically made for homeschoolers! Imagine a digital co-op that you can 100% customize to tailor to your specific needs. You can browse and connect with like-minded families, search for classes, special events or excursions or even' +
      ' become a host yourself by offering your talents as the community\'s newest host! \n \nCheck it out at www.mycommunityclassroom.com ',
      response: ''
    }
  }

  handleFieldChange (value, fieldName) {
    let inputObj = {};
    inputObj[fieldName] = value;
    this.setState(inputObj);
  }

  sendMail (data) {

    let response = sendEmail(data.addresses, "You have been invited to MC2 by " + this.props.user.displayName, data.message)
      .then((response) => {
    if (response.ok) {
      this.props.alertFunc('success', 'Success', 'Invite successfully sent!');
      this.setState({
        response: `${response.status} - ${response.ok}`,
        addresses: '',
        message: ''
      });
    }
    else {
      this.props.alertFunc('error', 'Error', 'Uh oh! Something went wrong. Please try again');
      this.setState({
        response: `${response.status} - ${response.ok}`
      });
    }
  });
  }


  /**
   *
   * @returns {XML}
   */
  render () {
    const props = this.props;
    const {globalStyles} = props;

    return (
      <ScrollView style={style.container}>
        <View style={style.titleRow}>
          <View style={{marginLeft:20, marginRight:20, marginBottom:5}}>
            <Text style={{fontSize:15, fontWeight:'100', color:'rgba(0,0,0,0.7)'}}>Please Enter email addresses to invite
             separated by a comma
              </Text>
          </View>
        </View>
        <View style={style.textGroup}>
          <View style={{marginRight:10}}>
            <Text
              style={style.questionStyle}>Email addresses?
            </Text>
          </View>
          <View>
            <TextInput
              style={[globalStyles.textInput]}
              multiline={false}
              placeholder='Enter Comma separated addresses here'
              placeholderTextColor="white"
              value={this.state.addresses}
              onChangeText={ (addresses) => this.handleFieldChange(addresses, 'addresses') }
            />
          </View>
        </View>
        <View style={style.textGroup}>
          <View style={{marginRight:10}}>
            <Text
              style={style.questionStyle}>Enter Email message here
            </Text>
          </View>
          <View>
            <TextInput
              style={[globalStyles.textInput, {height: 150}]}
              multiline={true}
              numberOfLines={9}
              placeholderTextColor="white"
              value={this.state.message}
              onChangeText={ (message) => this.handleFieldChange(message, 'message') }
            />
          </View>
        </View>
        <View style={[style.textGroup, {width:'100%'}]}>
          <View>
            <Button text='SUBMIT' extraStyle={{backgroundColor: 'rgba(121, 189, 244, 0.9)'}}
                    onPress={ () => this.sendMail(this.state) }/>
          </View>
        </View>

      </ScrollView>
    )
  }
}

export default InviteForm;
