import React, { Component } from 'react';
import {
  Navigator,
  View,
  TouchableHighlight,
  Text,
  AsyncStorage
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import random from '../helpers/random';
import scenes from '../scenes';
import style from '../styles';
import Nav from './Nav';
import Button from './Button';
import FooterNav from './FooterNav';
import store from '../redux/store';

import { getHostEvents } from '../helpers/events';
import { startListeningForUsers } from '../redux/actions/user';
import { startListeningToAuthChanges } from '../redux/actions/auth';
import { startListeningForNotifications } from '../redux/actions/notifications';

import styleVariables from '../styles/variables'


const ROUTES = Object.keys(scenes).map((scene, i) => ({ scene }));

const TRANSITIONS = [
  'PushFromRight',
  'FloatFromRight',
  'FloatFromLeft',
  'FloatFromBottom',
  'FloatFromBottomAndroid',
  'FadeAndroid',
  'SwipeFromLeft',
  'HorizontalSwipeJump',
  'HorizontalSwipeJumpFromRight',
  'HorizontalSwipeJumpFromLeft',
  'VerticalUpSwipeJump',
  'VerticalDownSwipeJump'
];

class App extends Component {
  constructor() {
    super();

    this.goBack = this.goBack.bind(this);
    this.goToScene = this.goToScene.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
  }

  goBack() {
    this.refs.navigator.pop();
  }

  goToScene(scene, props = {}) {
    this.refs.navigator.push({ scene, props });
  }

  renderScene(route, navigator) {
    const Scene = scenes[route.scene];
    return <Scene app={this} globalStyles={style} {...this.props} {...route.props}/>;
  }

  configureScene(route, routeStack) {
    const transition = TRANSITIONS[random(0, TRANSITIONS.length - 1)];
    // remove the gesture navigation
    return(
      {
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
          gestures: {
            pop: {},
          }
      }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { navigator } = this.refs
    const props = this.props;
    // get the current scene
    let currentScene = navigator.getCurrentRoutes().pop().scene;
    // get the status of the user authentication
    let { status } = props.auth;

    AsyncStorage.getItem('type', (err, type) => {
      // if the user is signed in, take them to the dashboard
      if(type === 'SIGN_IN' && status !== 'ANONYMOUS') {
        // if (!currentScene) this.goToScene('Dashboard');
        if (currentScene !== 'Dashboard' && currentScene !== 'EventDetails') this.goToScene('Dashboard');
      } 
      // if the user is anonymous, take them to the welcome screen
      else if(type === 'SIGN_OUT' || status === 'ANONYMOUS') {
        if (currentScene !== 'Welcome') this.goToScene('Welcome');
      }
      else {
      }
    });
  }

  componentDidMount() {
    const { navigator } = this.refs

    // remove any trace of CREATING_ACCOUNT on app init to prevent infinite loading
    AsyncStorage.getItem('type', (err, type) => {
      type === 'CREATING_ACCOUNT' && AsyncStorage.removeItem('type');
    })
    // start listening for changes in Firebase
    store.dispatch(startListeningForUsers(navigator));
    store.dispatch(startListeningToAuthChanges(navigator));
    store.dispatch(startListeningForNotifications(navigator));

    // retrive event data
    getHostEvents();
  }

  render() {

    const props = this.props;
    // get the status of the user authentication
    let { status } = props.auth;

    return (
      <LinearGradient colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} style={style.fullscreen}>

        <Navigator ref='navigator'
          style={style.fullscreen}
          initialRoute={ROUTES[0]}
          renderScene={this.renderScene}
          configureScene={this.configureScene} />

        <Nav ref='navMenu' app={this} style={style} />
        {/* status === 'SIGN_IN' && <FooterNav app={this} /> */}

      </LinearGradient>
    );
    
  }
}

export default App;
