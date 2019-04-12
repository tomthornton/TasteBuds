import React from "react";
import { View,Text,StyleSheet,TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Google, Facebook } from 'expo';
import Swiper from "react-native-web-swiper";
import firebase from 'firebase';

const styles = StyleSheet.create({
	logo: {
		fontFamily: 'quicksand-regular',
		fontSize: 60,
		color: '#14c535',
		marginBottom: 30,
		textAlign: 'center'
		},
	container: {
		flex: 1,
		backgroundColor: '#111111'
	},
	slideContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start"
	},
	formInput: {
		backgroundColor: 'rgba(255,255,255,0.5)',
		width: '70%',
		height: 40,
		padding: 10,
		marginTop: 10
	},
	tabTitle: {
		color: 'white',
		fontFamily: 'quicksand-regular',
		fontSize: 18,
		textAlign: 'center'
	},
	tabTitleWrapper: {
		borderColor: '#14c535', 
		paddingBottom: 5
	},
	actionButton: {
		width: '70%',
		height: 40,
		borderWidth: 1,
		borderColor: '#14c535',
		marginTop: 20,
		textAlign: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 10
	},
	actionButtonText: {
		color: 'white',
		fontFamily: 'quicksand-regular',
		fontSize: 14,
		flexGrow: 1,
		textAlign: 'center',
		paddingRight: 10
	},
	googleButton: {
		width: '70%',
		height: 40,
		backgroundColor: '#DB3447',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 10,
		borderRadius: 10
	},
	facebookButton: {
		width: '70%',
		height: 40,
		backgroundColor: '#3C5A99',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 10,
		borderRadius: 10,
		marginBottom: 20
	}

});


export default class swiperTest extends React.Component {
state = {currentTab: 0}
onSignIn = googleUser => {
	console.log('Google Auth Response', googleUser);
	// We need to register an Observer on Firebase Auth to make sure auth is initialized.
	var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
	  unsubscribe();
	  // Check if we are already signed-in Firebase with the correct user.
	  if (!this.isUserEqual(googleUser, firebaseUser)) {
	    // Build Firebase credential with the Google ID token.
	    var credential = firebase.auth.GoogleAuthProvider.credential(
		googleUser.idToken,
		googleUser.accessToken);
	    // Sign in with credential from the Google user.
	    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(
		    () => console.log('user signed in')
	    ).catch(function(error) {
	      // Handle Errors here.
	      var errorCode = error.code;
	      var errorMessage = error.message;
	      // The email of the user's account used.
	      var email = error.email;
	      // The firebase.auth.AuthCredential type that was used.
	      var credential = error.credential;
	      // ...
	    });
	  } else {
	    console.log('User already signed-in Firebase.');
	  }
	}.bind(this));
      }
isUserEqual = (googleUser, firebaseUser) => {
	if (firebaseUser) {
	  var providerData = firebaseUser.providerData;
	  for (var i = 0; i < providerData.length; i++) {
	    if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
		providerData[i].uid === googleUser.getBasicProfile().getId()) {
	      // We don't need to reauth the Firebase connection.
	      return true;
	    }
	  }
	}
	return false;
      }
tabChanged = (index) => this.setState(() => ({currentTab: index}))
async googleLogin(){
	const result = await Google.logInAsync({
		behavior: 'web',
		clientId: '195218616180-j5l63d6d7sfl4rku53c5a2mhm5fujhlj.apps.googleusercontent.com'
	}).catch(err=>err).then();
	if (result.type === 'success') {
		this.onSignIn(result);
  		await Google.logOutAsync(result);
	}
}
async facebookLogin() {
	const result = await Facebook.logInWithReadPermissionsAsync(
		'353243238642936', {permissions: ['public_profile']}
	);
	if (result.type == 'success') {
		const credential = firebase.auth.FacebookAuthProvider.credential(result.token);
		console.log(credential);
		firebase.auth().signInAndRetrieveDataWithCredential(credential);
	}
};

render() {
	return (
	<View style={styles.container}>
	<ImageBackground source={require('../assets/images/loginbg.png')} style={{width: '100%', height: '100%', resizeMode: 'cover'}}>
		<View style={{height: "40%", justifyContent: 'flex-end', alignItems: 'center'}}>
			<Text style={styles.logo}>TasteBuds</Text>
			<View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 30, width: 150}}>
					<View style={[styles.tabTitleWrapper,
					{borderBottomWidth: this.state.currentTab == 0 ? 1 : 0,
					opacity: this.state.currentTab == 0 ? 1 : 0.5
					}]}>
						<Text style={styles.tabTitle}>Login</Text>
					</View>
					<View style={[styles.tabTitleWrapper,
					{borderBottomWidth: this.state.currentTab == 1 ? 1 : 0,
					opacity: this.state.currentTab == 1 ? 1 : 0.5}]}>
						<Text style={[styles.tabTitle]}>Sign-Up</Text>
					</View>
			</View>
		</View>
		<Swiper style={{height: '60%'}}
		controlsWrapperStyle={{paddingBottom: 30}}
		nextButtonStyle={{display: "none"}}
		prevButtonStyle={{display: "none"}}
		activeDotStyle={{backgroundColor: "#14c535"}}
		dotStyle={{backgroundColor: "rgba(255,255,255,0.5)"}}
		index={this.state.currentTab}
		onIndexChanged={this.tabChanged}>
			<View style={[styles.slideContainer]}>
				<TextInput style={styles.formInput}placeholder='Email'/>
				<TextInput style={styles.formInput}placeholder='Password'/>
				<TouchableOpacity style={[styles.actionButton, {marginBottom: 20}]}>
						<Text style={styles.actionButtonText}>Login</Text>
				</TouchableOpacity>
				<View style={{flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 100}}>
					<TouchableOpacity
					style={[styles.facebookButton]}
					onPress={() => this.facebookLogin()}>
						<AntDesign name={'facebook-square'} color='white' size={20}/>
						<Text style={styles.actionButtonText}>Login with Facebook</Text>
					</TouchableOpacity>
					<TouchableOpacity
					style={[styles.googleButton]}
					onPress={() => this.googleLogin()}>
							<AntDesign name={'google'} color='white' size={20}/>
							<Text style={styles.actionButtonText}>Login with Google</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={[styles.slideContainer]}>
				<TextInput style={styles.formInput}placeholder='First Name'/>
				<TextInput style={styles.formInput}placeholder='Last Name'/>
				<TextInput style={styles.formInput}placeholder='Email'/>
				<TextInput style={styles.formInput}placeholder='Password'/>
				<TouchableOpacity style={[styles.actionButton, {marginBottom: 20}]}>
						<Text style={styles.actionButtonText}>Sign-Up</Text>
				</TouchableOpacity>
				<View style={{flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 100}}>
					<TouchableOpacity
					style={[styles.facebookButton]}
					onPress={() => this.facebookLogin()}>
						<AntDesign name={'facebook-square'} color='white' size={20}/>
						<Text style={styles.actionButtonText}>Sign-Up with Facebook</Text>
					</TouchableOpacity>
					<TouchableOpacity
					style={[styles.googleButton]}
					onPress={() => this.googleLogin()}>
							<AntDesign name={'google'} color='white' size={20}/>
							<Text style={styles.actionButtonText}>Sign-Up with Google</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Swiper>
		</ImageBackground>
	</View>
	)
}
}