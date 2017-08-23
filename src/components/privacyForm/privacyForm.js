/**
 * Created by Omkareshwar on 8/22/17.
 */
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import colorsVariables from '../../styles/variables';
import RadioForm from 'react-native-simple-radio-button';


const PrivacyForm = (props) => {

  const privacy_props = [
    {label: 'Public', value: 'public' },
    {label: 'Private', value: 'private' }];

  return(
    <View style={{alignItems: 'center', marginTop:10, marginBottom:10}}>
      <Text style={props.globalStyle.checkboxSubTitle}>{props.title}</Text>
      <RadioForm
        radio_props={privacy_props}
        formHorizontal={true}
        buttonColor={colorsVariables.mc2LightBlue}
        style={{paddingTop: 15, marginRight: 10}}
        labelStyle={{marginRight: 30}}
        labelColor={'white'}
        initial={props.privacy === 'public' ? 0 : 1 }
        onPress={(value) => { props.onChange(value, 'privacy') }}
      />
    </View>
  )
};

export default PrivacyForm;