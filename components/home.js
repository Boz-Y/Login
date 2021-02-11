//Importation des dépendances
import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';

//Déclaration de la classe principale
const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    //que fait la fonction en retour est le développement de l'interface 
    return (
      <View style={styles.container}>
      <ImageBackground source={require('../assets/shop.jpg')} style={{flex: 1, resizeMode: 'cover',
    justifyContent: 'center',}}>
        <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#B7E5E6', opacity: 0.8,}}/>
             <StatusBar backgroundColor='#5AC5C7' barStyle="light-content"/>
             <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <StatusBar barStyle="light-content" />
                <View style={styles.header}>
                </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Animatable.Text animation="fadeInLeft" style={[styles.title, {
                color: colors.text
            }]}>Hello user!</Animatable.Text>
        </Animatable.View>
        </ImageBackground>
      </View>
    );
};

export default SplashScreen;


//Partie CSS
const {height} = Dimensions.get('screen');
const height_logo = height * 0.3 * 0.4;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#5AC5C7'
  },
  imagebg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 200,
      paddingHorizontal: 50
  },
 
  logo: {
      width: height_logo,
      height: height_logo,  
  },
  title: {
      color: '#1CB5E0',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'black',
      marginTop:5
  },
  button: {
      alignItems: 'center',
      marginTop: 10,
      paddingBottom: 10,
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
  
});

