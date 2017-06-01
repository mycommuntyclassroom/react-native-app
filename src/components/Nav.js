import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import actions from '../redux/actions';
import store from '../redux/store';

import Dimensions from 'Dimensions';
import Easing from 'Easing';
import Button from './Button';

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

const ROUTES = [
  inbox,
  friends,
  calendar,
  map,
  settings,
  feedback
];

class Nav extends Component {
  constructor() {
    super();

    this.easing = Easing.quad;
    this.duration = 300;

    this.state = {
      x: new Animated.Value(-Dimensions.get('window').width)
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  animate(toValue) {
    const { easing, duration } = this;
    Animated.timing(
      this.state.x,
      { toValue, easing, duration }
    ).start();
  }

  open() {
    this.animate(0);
  }

  close() {
    this.animate(-Dimensions.get('window').width);
  }

  onPress(scene, props = {}) {
    const { app } = this.props;
    this.close();
    setTimeout(() =>
      app.goToScene(scene, props)
    , this.duration);
  }

  render() {
    const { style } = this.props;
    return (
      <Animated.View style={[style.Nav, { left: this.state.x }]}>
        <Button
          text='Logout'
          onPress={ () => store.dispatch(actions.signOut()) }
          extraStyle={style.navLink} />
        {ROUTES.map((route, i) => {
          const { scene, props } = route;
          return (
            <View key={i} style={style.NavLink}>
              <Button text={scene} onPress={() => this.onPress(scene, props)} />
            </View>
          );
        })}

        <Button text='close' onPress={this.close} />

      </Animated.View>
    );
  }
}

export default Nav;
