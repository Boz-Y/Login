/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */

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
import {CheckBox} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import {SocialIcon} from 'react-native-elements';
import {Checkbox} from 'react-native-paper';
import Modal from 'react-native-modal';

import axios from 'axios';

export default class signupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: '',
      email: '',
      login: '',
      telephone: '',
      check_textInputChange: false,
      check_textInputChangeTel: false,
      password: '',
      secureTextEntry: true,
      password_confirm: '',
      secureTextEntry_confirm: true,
      selectedLang: 0,
      message: '',
      me_nom: '',
      me_email: '',
      me_login: '',
      me_telephone: '',
      me_password: '',
      me_password_confirm: '',
      autoFocus: false,
      isModalVisible: false,
      userInfo: {},
      userInfo2: '',
      checked: false,
    };
  }

  checkBox_Test = (id) => {
    this.setState((prevState) => ({check: !prevState.check}));
  };
  
  textInputChange(value) {
    if (value.length !== 0) {
      var expressionReguliere = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
      if (expressionReguliere.test(value)) {
        this.setState({
          check_textInputChange: true,
        });
      } else {
        this.setState({
          check_textInputChange: false,
        });
      }
    } else {
      this.setState({
        check_textInputChange: false,
      });
    }
  }

  textInputChangeTel(telephone) {
    if (telephone.length !== 0) {
      var regex = new RegExp(/^(01|02|03|04|05|06|08)[0-9]{3}/gi);
      if (telephone.length === 8) {
        this.setState({
          check_textInputChangeTel: true,
        });
      } else {
        this.setState({
          check_textInputChangeTel: false,
        });
      }
    } else {
      this.setState({
        check_textInputChangeTel: false,
      });
    }
  }

  secureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  }
  secureTextEntry_confirm() {
    this.setState({
      secureTextEntry_confirm: !this.state.secureTextEntry_confirm,
    });
  }
  _onPressHandler() {
    const str = this.state.nom;
    const words = str.split(' ');
    const nom = words[0];
    const prenom = words[1];

    if (this.state.nom.length === 0) {
      this.setState({
        me_nom: 'Vous devez saisir votre nom et prénom',
        autoFocus: true,
      });
    }
    if (this.state.email.length === 0) {
      this.setState({
        me_email: 'Vous devez saisir votre email',
      });
    }
    if (this.state.telephone.length === 0) {
      this.setState({
        me_telephone: 'Vous devez saisir votre téléphone',
      });
    }
    if (this.state.login.length === 0) {
      this.setState({
        me_login: 'Vous devez saisir votre login',
      });
    }
    if (this.state.password.length === 0) {
      this.setState({
        me_password: 'Vous devez saisir votre mot de passe',
      });
    }

    if (
      this.state.nom !== '' &&
      this.state.password !== '' &&
      this.state.email !== '' &&
      this.state.login !== '' &&
      this.state.telephone !== ''
    ) {
      if (
        this.state.password === this.state.password_confirm &&
        this.state.check_textInputChangeTel &&
        this.state.check_textInputChange
      ) {
        this.loadingButton.showLoading(true);

        axios
          .post(
            'https://https://luxo-vtc-mobile.herokuapp.com/api/inscription',
            {
              nom: nom,
              prenom: prenom,
              email: this.state.email,
              login: this.state.login,
              mdp: this.state.password,
              numero: this.state.telephone,
            },
          )
          .then((res) => {
            // this.loadingButton.showLoading(false);
            // popup puis redirection

            if (res.data.ok === false) {
              this.setState({
                me_email: 'Email utilisé',
              });
              this.loadingButton.showLoading(false);
            } else {
              this.openModal();

              console.log(res.data);
            }
          });
      } else {
        if (!this.state.check_textInputChange) {
          this.setState({
            me_email: 'Entrer un email valide',
          });
        }
        if (!this.state.check_textInputChangeTel) {
          this.setState({
            me_telephone: 'Entrer un numéro de téléphone valide',
          });
        }

        if (this.state.password !== this.state.password_confirm) {
          this.setState({
            message: 'Vous devez confirmer votre mot de passe',
          });
        }
      }
    }
  }

  closeModal = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.navigate('loginScreen');
  };

  openModal = () => {
    this.loadingButton.showLoading(false);
    this.setState({isModalVisible: true});
  };

  render() {
    const {checked} = this.state;
    const scroll = React.createRef();
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.isModalVisible}
          avoidKeyboard={true}
          style={{
            flex: 1,

            borderRadius: 30,
            // marginBottom: 40,
            // marginTop: 40,
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <View
            style={{
              height: '20%',
              backgroundColor: '#ececec',
              // paddingVertical: 10,
              paddingHorizontal: 0,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 23}}>Bienvenu dans Luxo VTC </Text>
            {/* <Text style={{fontSize: 23 , paddingBottom: 10 }} >avec succé</Text> */}
            <TouchableOpacity
              onPress={this.closeModal}
              style={{
                backgroundColor: '#00FF00',
                marginRight: 10,
                width: '50%',
                height: 40,
                borderRadius: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10%',
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Connectez-vous
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <ImageBackground
          source={require('../../assets/sidebg2.jpg')}
          style={styles.imagebg}>
          <View style={styles.overlay} />
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <TouchableOpacity
            style={{top: '20%', left:'3%', paddingBottom: 80, paddingLeft: 10}}
            onPress={() => this.props.navigation.goBack()}>
            <FontAwesome name="chevron-left" color="#FFF" size={30} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Animatable.Image
              animation="fadeInRightBig"
              duration={1800}
              source={require('../../assets/shortlogowhite.png')}
              style={styles.logo}
              resizeMode={'stretch'}
            />
            <Animatable.Text
              animation="fadeInLeftBig"
              duration={1800}
              style={styles.text_header}>
              inscrivez-vous
            </Animatable.Text>
            <Animatable.Text animation="fadeInUp" duration={1800}>
              <AntDesign name="adduser" color="#FFF" size={50} />
            </Animatable.Text>
          </View>
        </ImageBackground>
        <Animatable.View animation="fadeInLeft" style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('SideMenuScreenChauffeur')
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              
            }}>
            <FontAwesome name="arrow-circle-o-down" color="#6f42c0" size={40} />
          </TouchableOpacity>
          <ScrollView ref={scroll} showsVerticalScrollIndicator={true}>
            <Text style={styles.text_footer}>Nom et Prenom:</Text>
            <View style={styles.actions}>
              <FontAwesome
                name="user-o"
                style={styles.icn}
                color="#6f42c0"
                size={30}
              />
              <TextInput
                autoFocus={this.state.autoFocus}
                onChangeText={(nom) => {
                  this.setState({nom, me_nom: ''});
                }}
                placeholder="Votre Nom et Prénom..."
                style={styles.textinput}
              />
            </View>
            {!!this.state.me_nom && (
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {this.state.me_nom}
              </Text>
            )}

            <Text style={styles.text_footer}>E-mail :</Text>
            <View style={styles.actions}>
              <Feather
                name="mail"
                style={styles.icn}
                color="#6f42c0"
                size={30}
              />
              <TextInput
                onChangeText={(email) => {
                  this.setState({email, me_email: ''});
                  this.textInputChange(email);
                }}
                placeholder="Votre Email..."
                style={styles.textinput}
                keyboardType={'email-address'}
              />
              {this.state.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather
                    name="check-circle"
                    style={styles.icnn}
                    color="green"
                    size={24}
                  />
                </Animatable.View>
              ) : null}
            </View>

            {!!this.state.me_email && (
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {this.state.me_email}
              </Text>
            )}

            <Text style={styles.text_footer}>Télephone :</Text>
            <View style={styles.actions}>
              <Feather
                name="phone"
                style={styles.icn}
                color="#6f42c0"
                size={30}
              />
              <Animatable.Image
                animation="bounceIn"
                duration={1800}
                source={require('../../assets/flagg.png')}
                style={{width: 32, height: 22, marginLeft: 9, borderRadius: 60}}
                resizeMode={'stretch'}
              />
              <Text style={{color: 'gray', marginLeft: 5}}>+216</Text>
              <TextInput
                onChangeText={(telephone) => {
                  this.setState({telephone, me_telephone: ''});
                  this.textInputChangeTel(telephone);
                }}
                placeholder="..."
                style={styles.textinput}
                keyboardType={'numeric'}
              />

              {this.state.check_textInputChangeTel ? (
                <Animatable.View animation="bounceIn">
                  <Feather
                    name="check-circle"
                    style={styles.icnn}
                    color="green"
                    size={24}
                  />
                </Animatable.View>
              ) : null}
            </View>

            {!!this.state.me_telephone && (
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {this.state.me_telephone}
              </Text>
            )}

            <Text style={styles.text_footer}>Login</Text>
            <View style={styles.actions}>
              <FontAwesome
                name="sign-in"
                style={styles.icn}
                color="#6f42c0"
                size={30}
              />
              <TextInput
                onChangeText={(login) => {
                  this.setState({login, me_login: ''});
                }}
                placeholder="Votre Login..."
                style={styles.textinput}
              />
            </View>

            {!!this.state.me_login && (
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {this.state.me_login}
              </Text>
            )}

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
                  placeholder="Mot de passe..."
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
                  placeholder="Nouveau Mot de passe..."
                  style={styles.textinput}
                  value={this.state.password}
                  onChangeText={(text) =>
                    this.setState({
                      password: text,
                      message: '',
                      me_password: '',
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

            {!!this.state.me_password && (
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {this.state.me_password}
              </Text>
            )}

            <Text style={[styles.text_footer, {marginTop: 10}]}>
              Confirmer Mot De Passe :
            </Text>
            <View style={styles.actions}>
              <FontAwesome
                name="lock"
                style={styles.icn}
                color="#6f42c0"
                size={30}
              />
              {this.state.secureTextEntry_confirm ? (
                <TextInput
                  placeholder="Confirmer Mot de passe..."
                  secureTextEntry={true}
                  style={styles.textinput}
                  value={this.state.password_confirm}
                  onChangeText={(text) =>
                    this.setState({
                      password_confirm: text,
                      message: '',
                    })
                  }
                />
              ) : (
                <TextInput
                  placeholder="Confirmer Mot de passe..."
                  style={styles.textinput}
                  value={this.state.password_confirm}
                  onChangeText={(text) =>
                    this.setState({
                      password_confirm: text,
                      message: '',
                    })
                  }
                />
              )}
              <TouchableOpacity onPress={() => this.secureTextEntry_confirm()}>
                {this.state.secureTextEntry_confirm ? (
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
            <Text style={{color: 'red', fontWeight: 'bold'}}>
              {' '}
              {this.state.message}{' '}
            </Text>
            <View style={styles.item1}>
              <Checkbox
                style={styles.chkbx}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({checked: !checked});
                }}
                color="#6f42c0"
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TermesScreen')}>
                <Text
                  style={{
                    ...styles.checkBoxTxt,
                    color: this.state.selectedLang === 1 ? '#6f42c0' : 'gray',
                    fontWeight:
                      this.state.selectedLang === 1 ? 'bold' : 'normal',
                  }}>
                  J'accepte les termes et les conditions
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonn}>
              <AnimateLoadingButton
                ref={(c) => (this.loadingButton = c)}
                width={300}
                height={50}
                title="S'inscrire"
                titleFontSize={16}
                titleColor="rgb(255,255,255)"
                backgroundColor="#6f42c0"
                borderRadius={30}
                onPress={this._onPressHandler.bind(this)}
              />
              <View style={styles.buttnres}>
                <Text
                  style={[styles.textsignn, {color: 'gray', paddingLeft: 10}]}>
                  Ou Avec
                </Text>
              </View>
              
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.3 * 0.4;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f42c0',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
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
  text_footer: {
    color: '#6f42c0',
    fontWeight: 'bold',
    fontSize: 18,
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
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    height: 45,
    marginLeft: 9,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonn: {
    alignItems: 'center',
    marginTop: 15,
  },
  signinn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  color_tp: {
    color: 'gray',
  },
  buttnres: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item1: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 30,
    
   margin:'2%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
  },
  checkBoxTxt: {
    marginLeft: 20,
  },
  chkbx: {
    borderRadius: 30,
    width: '7.8%',
    height: '10%',
  },
});
