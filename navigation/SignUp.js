import React from 'react'
import firebase from '../util/firebase';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Button} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Swiper from "react-native-web-swiper";
export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  loginForm = () => {this.props.navigation.navigate('Login')}
  doNothing = () => {};
render() {
    return (
      <View style={styles.container}>
{/* 				<Text style={styles.logo}>TasteBuds</Text> */}
				<Swiper>
					<View style={{flexGrow: 1,         alignItems: "center",
        justifyContent: "center"}}>
						<Text style={styles.signUpText}>Register for a new account</Text>
						<TouchableOpacity
						style={[styles.box, styles.googleButton]}
						onPress={this.doNothing()}>
							<AntDesign name={'google'} color='white' size={20}/>
							<Text style={styles.buttonText}>Google</Text>
						</TouchableOpacity>
						<TouchableOpacity
						style={[styles.box, styles.facebookButton]}
						onPress={this.doNothing()}>
							<AntDesign name={'facebook-square'} color='white' size={20}/>
							<Text style={styles.buttonText}>Facebook</Text>
						</TouchableOpacity>
						<TouchableOpacity
						style={[styles.box, styles.emailButton]}
						onPress={this.doNothing()}>
							<MaterialIcons name={'email'} color='white' size={20}/>
							<Text style={styles.buttonText}>Email</Text>
						</TouchableOpacity>
					</View>
					<View style={{flexGrow: 1,        alignItems: "center",
        justifyContent: "center"}}>
						<Text style={{color: "white"}}>what's up</Text>
					</View>
				</Swiper>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  logo: {
    fontFamily: 'quicksand-regular',
    fontSize: 60,
    color: '#14c535',
    marginBottom: 30
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  container: {
    backgroundColor: '#111111',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 40,
    width: '75%',
    marginTop: 20,
    color: 'white',
    borderRadius: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  signUpText: {
    fontSize: 18,
    fontFamily: 'quicksand-regular',
    color: 'white'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'quicksand-regular',
    textAlign: 'center',
    flexGrow: 1,
    paddingRight: 20
  },
  facebookButton: {
    backgroundColor: '#3C5A99'
  },
  googleButton: {
    backgroundColor: '#DB3447'
  },
  emailButton: {
    backgroundColor: 'rgba(255,255,255,0.4)'
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.2)'
  },

})
