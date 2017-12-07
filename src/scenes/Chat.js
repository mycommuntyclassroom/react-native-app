import React, { Component } from 'react'
import { View } from 'react-native'
import Header from '../components/Header'
import { GiftedChat } from 'react-native-gifted-chat'
import { sendMessage } from '../helpers/user'

class Chat extends Component {

  constructor () {
    super();

  }

  componentWillMount () {
    let msg = [];
    this.setState({
      messages: msg,
    });
  }

  onSend (messages = []) {

    let msgObj = (messages[0]);
    sendMessage(this.props, Object.assign({}, msgObj, {receiver: this.props.gid, sender: this.props.user.uid}));
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, messages),
    //   };
    // });
  }

  render () {
    const props = this.props;
    const {globalStyles, app, user} = this.props;

    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <Header backOption={true} scene="GuardianDetails" { ...props } />
        <GiftedChat
          messages={this.props.user.messages ? Object.values(this.props.user.messages)
      .filter(msg => ((msg.sender === this.props.gid && msg.receiver === this.props.user.uid) ||
    ( msg.receiver === this.props.gid && msg.sender === this.props.user.uid))).sort(function compare (a, b) {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateB - dateA;
    }) : []}
          onSend={(messages) => this.onSend(messages)}
          user={{_id: user.uid, name: user.displayName, avatar: ''}}
        />

      </View>
    );
  };

}

export default Chat;