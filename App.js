/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
//import react in project
import { StyleSheet} from 'react-native';
import RootStack from './RootStack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      isLoaded :false,
    };
  }

  render() {
   
      return (
        <RootStack/>
      )
      
    }
  
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 200,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 55,
    fontWeight:'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
   buttonCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#6f42c0',
    opacity: 0.8,
  },
});
