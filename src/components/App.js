import React, { Component } from 'react';
import {
  Navigator,
  View,
  TouchableHighlight,
  Text,
  AsyncStorage
} from 'react-native';

import random from '../helpers/random';
import { goToScene } from '../helpers/navigation';
import scenes from '../scenes';
import style from '../style';
import Nav from './Nav';
import Button from './Button';
import store from '../redux/store';

import { startListeningForUsers } from '../redux/actions/user';
import { startListeningToAuthChanges } from '../redux/actions/auth';
import { startListeningForNotifications } from '../redux/actions/notifications';


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
    return <Scene app={this} style={style} {...this.props} {...route.props}/>;
  }

  configureScene(route, routeStack) {
    const transition = TRANSITIONS[random(0, TRANSITIONS.length - 1)];
    // const transition = 'VerticalUpSwipeJump';
    return Navigator.SceneConfigs[transition];
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate props::: ', this.props)
    const { navigator } = this.refs
    const props = this.props;
    // get the current scene
    let currentScene = navigator.getCurrentRoutes().pop().scene;
    console.log('currentScene: ', currentScene)
    console.log('here are the App props: ', props);
    console.log('navigator: ', navigator)
    let { status } = props.auth;
    console.log('status: ', status)
    // const dataIsReady = this.props.dataReady;
    // const dataWasReady = prevProps.dataReady;
    // const justLoaded = dataIsReady && !dataWasReady;
    // if (justLoaded) {

      // If first time starting app, show welcome scene
      // this.goToScene('Welcome');

      // Else If not logged in, go to login

      // If already logged in, go to last visited page (use local data)
    // }
    // since there are several different scenes that could be rendered
    // based on your Auth status, determine which page to render on the index
    // 
    if(status === 'SIGNED_IN' && (currentScene === 'Loading' || currentScene === 'Welcome')) {
      this.goToScene('Dashboard')
    } 
    else if((status === 'SIGN_OUT' || status === 'CREATING_ACCOUNT') && currentScene === 'Loading') {
     this.goToScene('Welcome');
    } 
    else {
      console.log('WE are not in ANONYMOUS, CREATING_ACCOUNT, or SIGNED_IN THUS, we rendered Welcome***');
      this.goToScene('Tutorial');
    }
  }

  componentDidMount() {
    const { navigator } = this.refs

    // start listening for changes in Firebase
    store.dispatch(startListeningForUsers(navigator));
    store.dispatch(startListeningToAuthChanges(navigator));
    store.dispatch(startListeningForNotifications(navigator));
  }

  render() {
    const buttonStyle = {
      position: 'absolute',
      bottom: 50,
      zIndex: 10
    };

    return (
      <View style={style.fullscreen}>

        <Navigator ref='navigator'
          style={style.fullscreen}
          initialRoute={ROUTES[0]}
          renderScene={this.renderScene}
          configureScene={this.configureScene}/>

        <Nav ref='navMenu' app={this} style={style} />

        <Button
          text='open'
          onPress={() => this.refs.navMenu.open()}
          extraStyle={buttonStyle} />

      </View>
    );
    
  }
}


export default App;
