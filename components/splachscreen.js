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
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

//Déclaration de la classe principale
const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

      //que fait la fonction en retour estle développement de l'interface 
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
            }]}>Stay connected with everyone!</Animatable.Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('loginScreen')}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={[styles.signIn,{
                        width:320,
                        paddingTop:30,
                        paddingBottom:40,
                        paddingLeft:25,
                        paddingRight:20,
                        alignItems:'center',
                    }]}
                >
                    <Text style={styles.textSign}>Login</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity
                    onPress={() => navigation.navigate('signupScreen')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        width:320,
                        paddingTop:30,
                        paddingBottom:40,
                        paddingLeft:25,
                        paddingRight:20,
                        alignItems:'center',
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
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

