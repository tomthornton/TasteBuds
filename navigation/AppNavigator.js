import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import Loading from './Loading';
import SignUp from './SignUp';
import Login from './Login';
import swiperTest from './swiperTest';

export default createAppContainer(createSwitchNavigator({
  Loading: Loading,
  Main: MainTabNavigator,
  Login: Login,
  SignUp: SignUp,
  swiperTest: swiperTest
  },{
  initialRouteName: 'Loading'
}));