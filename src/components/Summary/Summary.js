import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  LayoutAnimation
} from 'react-native';

import style from './style';

class Summary extends Component {

  constructor(props) {
    super(props);

    this.state={
      expandTags:false
    };

    this.expandTags=this.expandTags.bind(this);
  }

  expandTags() {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      expandTags: !this.state.expandTags
    })
  }

  render(){ 

    const props = this.props;
    const { app, guardianData } = props;
    let userData;

    // if guardianData is passed in the props, then show guardian data 
    // instead of admin user data
    guardianData ? userData = guardianData : userData = app.props.user

    const { greeting } = userData;
    const languages = userData['languages spoken'] || [];
    const specialties = userData.specialties || [];
    let wrapState = this.state.expandTags ? 'wrap' :'nowrap';
    let ellipseText = !this.state.expandTags ? '...' : '^';

    let languageTags = dataToTag(languages, 'languages');
    let specialtyTags = dataToTag(specialties, 'specialties');

    function dataToTag (items, cat) {
      return (
        items.map( (item, i) => {
          let keyId=`${cat}${item}${i}`
          return (
            <View style={style.tagItem} key={keyId}>
              <Text style={style.tagItemCopy}>{item}</Text>
            </View>
          )
        })
      );
    }

    // check if the user wrote a greeting
    const greetingCopy = greeting 
      ? <Text style={style.summaryCopy}>{greeting}</Text>
      : <Text style={[style.summaryCopy, style.summaryBodyCopy]} >It looks like you don't have a summary bio yet, you can add one by clicking the edit button (which you don't see yet, because we're developing it).</Text>

    return(
      <View style={style.container}>
        <View style={style.greetingContainer}>{ greetingCopy }</View>
        <View style={{flexDirection:'row', flex:1, marginLeft:10, marginRight:10}}>
          <View style={{flex:0.8, flexDirection:'row', flexWrap: wrapState, overflow:'hidden' }}>
            {languageTags}
            {specialtyTags}
          </View>
          <View style={{flex:0.2, paddingLeft:5, alignItems:'center'}}>

            <TouchableHighlight onPress={ () =>{
                  this.expandTags();}} underlayColor={'white'}>
              <View style={style.ellipsis}>
                <Text style={{width:20, textAlign:'center', color:'#fff'}}>{ellipseText}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  } 
};

export default Summary;