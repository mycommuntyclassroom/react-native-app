import React, { Component } from 'react';
import Link from '../Link/Link';
import { FaEnvelopeO, FaUser, FaMailForward } from 'react-icons/lib/fa';

class Invite extends Component {

  sendEmail() {

  }

  accessAddress() {

  }

  /**
   *
   * @returns {XML}
   */
  render() {
    console.log('Here are the invite Props: ', this.props);
    return(
      <View className="invite">
        <Text>Invite</Text>
        <View>
          <View>
            <View className="icon cell">
              <FaEnvelopeO />
            </View>
            <View className="cell">
              <Link onClick={ this.sendEmail } text={Email} />
              <Text>The easiest way to quickly invite someone</Text>
            </View>
          </View>
          <View>
            <View className="icon cell">
              <FaUser />
            </View>
            <View className="cell">
              <Link onClick={ this.accessAddress } text='Address Book' />
              <Text>Pick neighbors from your address book</Text>
            </View>
          </View>
          <View>
            <View className="cell">
              <FaMailForward />
            </View>
            <View className="cell">
              <Link onClick={ this.accessAddress } text='Post Cards' />
              <Text>Select addresses, we'll send free postcards</Text>
            </View>
          </View>
        </View>
        <View className="cancel">
          <Link onClick={ this.props.handleInvite } text='Cancel' />
        </View>
      </View>
    )
  }
}

Invite.propTypes = {};

export default Invite;
