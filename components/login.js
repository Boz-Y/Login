//Importation des dépendances
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
// import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SocialIcon} from 'react-native-elements';

import SpinnerButton from 'react-native-spinner-button';
import { Signin } from './consommerlogin';

const colors = ['#3b5998', '#db3236'];

//Déclaration de la classe principale
export default class loginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textInputChange: false,
      check_textInputChangeEmail_R: false,
      loginn: '',
      login: false,
      password: '',
      secureTextEntry: true,
      connect: false,
      message: '',
      store: false,
      userInfo: {},
      userInfo2: '',
      defaultLoading: false,
      defaultLoading2: false,
      email: '',
      messageReset: '',
      color: false,
    };
  }
  state = {
    isModalVisible: false,
  };


 
  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      messageReset: '',
    });
  };

  textInputChange(value) {
    if (value.length !== 0) {
      this.setState({
        check_textInputChange: true,
        loginn: value,
        message: '',
      });
    } else {
      this.setState({
        check_textInputChange: false,
        loginn: value,
      });
    }
  }

  _onPressHandler() {
    if (this.state.loginn !== '' && this.state.password !== '') {
      this.loadingButton.showLoading(true);

     Signin(this.state.loginn,this.state.password)
     .then((res) => {
      console.log(res)
      this.props.navigation.navigate('HomeScreen');
    });
  }
}

  storeCollector = async () => {
    let store = JSON.parse(await AsyncStorage.getItem('login'));
    if (store && store.login) {
      this.setState({login: true, store: store});
    } else {
      this.setState({login: false});
    }
  };

  textInputChangeEmail_R(value) {
    if (value.length !== 0) {
      var expressionReguliere = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
      if (expressionReguliere.test(value)) {
        this.setState({
          check_textInputChangeEmail_R: true,
        });
      } else {
        this.setState({
          check_textInputChangeEmail_R: false,
        });
      }
    } else {
      this.setState({
        check_textInputChangeEmail_R: false,
      });
    }
  }

  //Fonction main pour le développement de l'interface 
  render() {
    
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <ImageBackground
            source={require('../assets/sidebg.jpg')}
            style={styles.imagebg}>
            <View style={styles.overlay} />
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent={true}
            />
            <TouchableOpacity
              style={{top: 80, left: 0, paddingBottom: 80, paddingLeft: 10}}
              onPress={() => this.props.navigation.goBack()}>
              <FontAwesome name="chevron-left" color="#FFF" size={30} />
            </TouchableOpacity>
            <View style={styles.header}>
              <Animatable.Image
                animation="fadeInRightBig"
                duration={1800}
                source={require('../assets/shortlogowhite.png')}
                style={styles.logo}
                resizeMode={'stretch'}
              />
              <Animatable.Text
                animation="fadeInLeftBig"
                duration={1800}
                style={styles.text_header}>
                connectez-vous{' '}
              </Animatable.Text>
            </View>
            <Animatable.Image
              animation="fadeInUp"
              duration={1800}
              source={require('../assets/loginuser.png')}
              style={{
                width: '26%',
                height: '30%',
                marginBottom: 50,
                marginLeft: 165,
              }}
              resizeMode={'stretch'}
            />
          </ImageBackground>

          <Animatable.View animation="fadeInRight" style={styles.footer}>
            <Text style={styles.text_footer}>Login :</Text>
            <View style={styles.actions}>
              <FontAwesome
                name="user-o"
                style={styles.icn}
                color="#6f42c0"
                size={30}
              />
              <TextInput
                placeholder="Votre login..."
                style={styles.textinput}
                value={this.state.loginn}
                onChangeText={(text) => this.textInputChange(text)}
                keyboardType={'email-address'}
              />
              {this.state.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather
                    name="check-circle"
                    style={styles.icnn}
                    color="green"
                    size={20}
                  />
                </Animatable.View>
              ) : null}
            </View>
            <Text style={[styles.text_footer, {marginTop: 10}]}>
              Mot De Passe :
            </Text>
            <View style={styles.actions}>
              <FontAwesome
                name="lock"
                style={styles.icn}
                color="#6f42c0"
                size={30}
              />
              {this.state.secureTextEntry ? (
                <TextInput
                  placeholder="Votre Mot de passe..."
                  secureTextEntry={true}
                  style={styles.textinput}
                  value={this.state.password}
                  onChangeText={(text) =>
                    this.setState({
                      password: text,
                      message: '',
                    })
                  }
                />
              ) : (
                <TextInput
                  placeholder="Votre Mot de passe..."
                  style={styles.textinput}
                  value={this.state.password}
                  onChangeText={(text) =>
                    this.setState({
                      password: text,
                    })
                  }
                />
              )}
              <TouchableOpacity onPress={() => this.secureTextEntry()}>
                {this.state.secureTextEntry ? (
                  <Feather
                    name="eye-off"
                    style={styles.icnn}
                    color="gray"
                    size={24}
                  />
                ) : (
                  <Feather
                    name="eye"
                    style={styles.icnn}
                    color="#232323"
                    size={24}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.buttnres}>
              <View style={{marginLeft:40}}>
                <SpinnerButton
                  buttonStyle={[
                    {backgroundColor: colors[0], borderRadius: 60, width: 50},
                  ]}
                  isLoading={this.state.defaultLoading}
                  onPress={() => {
                    this.setState({defaultLoading: true});
                    this.loginWithFacebook();
                  }}
                  indicatorCount={10}>
                  <View style={{width: '350%'}}>
                    <SocialIcon button title="Facebook" type="facebook" />
                  </View>
                </SpinnerButton>
              </View>
              <Text>{'   '}</Text>
              <View
                style={{
               marginRight:40,   
                }}>
                <SpinnerButton
                  buttonStyle={[
                    {backgroundColor: colors[1], borderRadius: 60, width: 50},
                  ]}
                  isLoading={this.state.defaultLoading2}
                  onPress={() => {
                    this.setState({defaultLoading2: true});
                    this.signIn();
                  }}
                  indicatorCount={10}>
                  <View style={{width: '350%'}}>
                    <SocialIcon button title="Google" type="google" />
                  </View>
                </SpinnerButton>
              </View>

              {/* 
                <TouchableOpacity
                  onPress={this.loginWithFacebook}
                  style={{width: '50%'}}>
                  <SocialIcon button title="Facebook" type="facebook" />
                </TouchableOpacity> */}
              {/* 
            <Text> </Text>
                <TouchableOpacity
                  onPress={this.signIn}
                  style={{width: '50%'}}>
                  <SocialIcon button  title="Google"type="google" />
                </TouchableOpacity> */}
            </View>

            {!!this.state.message && (
              <Text style={{color: 'red', fontWeight: 'bold', paddingTop: 15}}>
                {this.state.message}
              </Text>
            )}
            <TouchableOpacity onPress={this.toggleModal}>
              <Text style={{color: 'gray', marginTop: 15}}>
                Mot De Passe Oublié?
              </Text>
            </TouchableOpacity>
            <Modal
              isVisible={this.state.isModalVisible}
              avoidKeyboard={true}
              style={{
                flex: 1,
                width: '100%',
                padding: 10,
                // borderRadius: 30,
                //   marginBottom: 30,
                // marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: '60%',
                  backgroundColor: '#ececec',
                  // paddingVertical: 20,
                  // paddingHorizontal: 25,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Animatable.Image
                  animation="bounceIn"
                  duration={2200}
                  source={require('../assets/passwordreset.png')}
                  style={styles.logo}
                  resizeMode={'stretch'}
                />
                <Text
                  style={{color: 'gray', fontWeight: '500', marginBottom: 10}}>
                  Mot de passe oublié ? Ne vous inquiétez pas{' '}
                  <FontAwesome5 name="smile-wink" color="gray" size={30} />{' '}
                </Text>
                <Text style={styles.text_footer}>
                  E-mail de réinitialisation :
                </Text>
                <View style={styles.actions}>
                  <Feather
                    name="mail"
                    style={styles.icn}
                    color="#6f42c0"
                    size={30}
                  />
                  <TextInput
                    width={'100%'}
                    placeholder="Votre Email..."
                    style={styles.textinput}
                    onChangeText={(email) => {
                      this.setState({email, messageReset: ''});
                      this.textInputChangeEmail_R(email);
                    }}
                    keyboardType={'email-address'}
                    //   value={this.state.email}
                  />
                  {this.state.check_textInputChangeEmail_R ? (
                    <Animatable.View animation="bounceIn">
                      <Feather
                        name="check-circle"
                        style={styles.icnn}
                        color="green"
                        size={20}
                      />
                    </Animatable.View>
                  ) : null}
                </View>

                {!!this.state.messageReset && (
                  <Text
                    style={{
                      color: this.state.color ? 'green' : 'red',
                      fontWeight: 'bold',
                      paddingBottom: 10,
                    }}>
                    {this.state.messageReset}
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={this.resetPassword}
                    style={{
                      backgroundColor: '#00ce00',
                      marginRight: 10,
                      width: '40%',
                      height: 50,
                      borderRadius: 30,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Envoyer
                    </Text>
                    <FontAwesome
                      name="send"
                      style={styles.icnn}
                      color="white"
                      size={20}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.toggleModal}
                    style={{
                      backgroundColor: '#ff4d4d',
                      marginRight: 10,
                      width: '40%',
                      height: 50,
                      borderRadius: 30,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome
                      name="close"
                      style={styles.icnn}
                      color="white"
                      size={20}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Fermer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={styles.buttonn}>
              {/* <LinearGradient
              colors={['#6f42c0', '#6f42c0']}
              style={[styles.signinn,{shadowColor: 'black',
              shadowOpacity: 1,
              elevation: 10,
              shadowRadius: 10 ,
              shadowOffset : { width: 5, height: 20}}]}>
              <Text style={styles.textsignn}>Se Connecter</Text>
            </LinearGradient> */}
              <AnimateLoadingButton
                ref={(c) => (this.loadingButton = c)}
                width={300}
                height={50}
                title="Se Connecter"
                titleFontSize={16}
                titleColor="rgb(255,255,255)"
                backgroundColor="#6f42c0"
                borderRadius={30}
                onPress={this._onPressHandler.bind(this)}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('signupScreen')}
                style={[
                  styles.signinn,
                  {
                    borderColor: '#6f42c0',
                    borderWidth: 1,
                    marginTop: 15,
                    width: '70%',
                    height: 50,
                  },
                ]}>
                <Text style={[styles.textsignn, {color: '#6f42c0'}]}>
                  S'inscrire
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

//Partie CSS
const {height} = Dimensions.get('screen');
const height_logo = height * 0.3 * 0.4;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f42c0',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imagebg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#6f42c0',
    opacity: 0.8,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
  },
  text_footer: {
    color: '#6f42c0',
    fontWeight: 'bold',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    borderBottomColor: '#6f42c0',
    backgroundColor: '#e4e3e3',
    borderRadius: 30,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonn: {
    alignItems: 'center',
    marginTop: 50,
  },
  signinn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 30,
  },
  textsignn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  icn: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  icnn: {
    paddingTop: 7,
    paddingRight: 10,
  },
  buttnres: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between', flex:1
  },
});
