import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { deviceDimensions } from '../../styles';

class Summary extends Component {

  constructor(props) {
    super(props);

    this.state={
      showAllTagsView: false
    }

    this.showAllTags=this.showAllTags.bind(this);
  }

  showAllTags() {
    this.setState({
      showAllTagsView: !this.state.showAllTagsView
    })
  }

  render(){ 

    const props = this.props
    let userData;

    // if guardianData is passed in the props, then show guardian data 
    // instead of admin user data
    props.guardianData ? userData = props.guardianData : userData = props.user

    // if showAllTags becomes true, update its value
    let showAllTagsClass = this.state.showAllTagsView ? "show-all-tags" : ""

    // toggle the icon-group based on the showAllTags value
    let iconGroupClass = this.state.showAllTagsView 
      ? <Text> MdKeyboardArrowUp </Text>
      : <Text>FaCircle FaCircle FaCircle</Text>

    const { greeting } = userData;
    const languages = userData['languages spoken'] || [' '];
    const specialties = userData.specialties || [' '];

    let languageTags = dataToTag(languages, 'languages');
    let specialtyTags = dataToTag(specialties, 'specialties');

    function dataToTag (items, cat) {
      return (
        items.map( (item, i) => {
          let keyId=`${cat}${item}${i}`
          return <View className="tag-item" key={keyId}><Text>{item}</Text></View>
        })
      );
    }

    // check if the user wrote a greeting
    const greetingCopy = greeting 
      ? <Text>greeting</Text>
      : <Text>It looks like you don't have a summary bio yet, you can add one by clicking the edit button (which you don't see yet, because we're developing it).</Text>

    return(
      <View className={`summary`}>
        <View className="raitings-and-comments"> 
          <View className="raitings">
            <View className="star-icon">
              <Text>MdStar</Text> 
            </View>
            <View className="count">
              <Text>4.8</Text>
            </View>
          </View>
          <View className="comments-teaser">
            <View className="comments-icon">
              <Text>FaCommentsO</Text>
            </View>
            <View className="count">
              <Text>12</Text>
            </View>
          </View>
        </View>
        <View className="greeting-copy">{ greetingCopy }</View>
        <Carousel
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={deviceDimensions.deviceWidth}
          itemWidth={50}
        >
          {languageTags}
          {specialtyTags}
        </Carousel>
        <View className="show-all-tags-button" onClick={this.showAllTags}>
          <View className="icon-group">{iconGroupClass}</View>
        </View>
      </View>
    )
  } 
};

export default Summary;