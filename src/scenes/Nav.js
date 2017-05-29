import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  TouchableHighlight,
  Text
} from 'react-native';

class Nav extends Component {

  get routes() {
    const inbox = {
      scene: 'Inbox',
      props: {
        filter: 'unread'
      }
    };

    const friends = {
      scene: 'Friends',
      props: {}
    };

    const calendar = {
      scene: 'Calendar',
      props: {}
    };

    const map = {
      scene: 'Map',
      props: {}
    };

    const settings = {
      scene: 'Settings',
      props: {}
    };

    const feedback = {
      scene: 'Feedback',
      props: {}
    };

    return [
      inbox,
      friends,
      calendar,
      map,
      settings,
      feedback
    ];
  }

  render() {
    const { style, app } = this.props;
    return (
      <View style={[style.nav]}>

        {this.routes.map((route, i) => {
          const { scene, props } = route;
          return (
            <View key={i} style={style.navLink}>
              <TouchableHighlight
                onPress={() => {
                  app.goToScene(scene, props);
                }}>
                <Text style={style.navText}>
                  {scene}
                </Text>
              </TouchableHighlight>
            </View>
          );
        })}

      </View>
    );
  };

}

export default Nav;
