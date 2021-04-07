import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Savings from '../assets/images/savings.svg';
import Facebook from '../assets/images/fb-logo.png';
import Google from '../assets/images/google-logo.png';
import Email from '../assets/images/email.png';

const AuthScreen = ({ navigation }) => {
  const navigateToApp = () => {
    navigation.navigate('Main')
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Savings height={250} width={270} />
      </View>
      <View style={styles.groupTextContainer}>
        <Text style={{...styles.textStyle, fontSize: 30, fontWeight: '300' }}>Organize your works</Text>
        <Text style={{...styles.textStyle, fontSize: 14, fontWeight: '100', textAlign: 'center' }}>Let's organize your works with priority and do everything without stress</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={navigateToApp}>
          <Image source={Facebook} style={styles.iconStyle}/>
          <Text style={{...styles.textStyle, fontWeight: '600'}}>Continue with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={navigateToApp}>
          <Image source={Google} style={styles.iconStyle}/>
          <Text style={{...styles.textStyle, fontWeight: '600'}}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonStyle, borderColor: '#e4e5e6', backgroundColor: 'transparent', borderWidth: 1}} onPress={navigateToApp}>
          <Image source={Email} style={styles.iconStyle}/>
          <Text style={{...styles.textStyle, fontWeight: '600'}}>Continue with Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
    height: 270,
  },
  iconStyle: {
    height: 30,
    width: 30,
    marginRight: 35
  },
  container: {
    height: height,
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 25
  },
  groupTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 40,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafc',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    marginTop: 15,
  },
  textStyle: {
    color: '#372f4f',
  }
});

export default AuthScreen;
