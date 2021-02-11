/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashComponent from './components/splachscreen';
import loginComponent from './components/login';
import signupComponent from './components/signup';
import HomeComponent from './components/home';
const StackNavigator = createStackNavigator({
  SplashScreen: {
    screen: SplashComponent,
    navigationOptions: {
      headerShown: false
    }
  },
  loginScreen: {
    screen: loginComponent,
    navigationOptions: {
      headerShown: false
    }
  },
  signupScreen: {
    screen: signupComponent,
    navigationOptions: {
      headerShown: false
    }
  },
  HomeScreen: {
    screen: HomeComponent,
    navigationOptions: {
      headerShown: false
    }
  },
});
export default createAppContainer(StackNavigator);
