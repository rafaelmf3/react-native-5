import React, { useEffect, useState } from 'react';
import { View, AsyncStorage, TextInput, Text, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validSubmit, setValidSubmit] = useState(false);
  
  
  const userData = AsyncStorage.getItem('user');
        
    function handleLogin() {
      let url = 'https://api.codenation.dev/v1/user/auth';
      axios.post(url, {
        email: email.text,
        password: password.text
      }).then(response => {
        AsyncStorage.setItem('user', JSON.stringify(response.data));
        navigation.navigate('Acceleration');
      });
    }

    handleValidEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return re.test(String(email).toLowerCase());
    } 

    return (
        <View>
            <View style={styles.header}>
                <Image
                    style={styles.headerImage}
                    source={{uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png'}}
                />
            </View>
            <View style={{margin: 30}}>
                <Text style={{fontSize: 30, color: '#7800ff'}}>Login</Text>
                <Text style={{marginTop: 10, color: '#7800ff', fontSize: 16}}>E-mail:</Text>
                <TextInput
                    className="email-input"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    label='Email'
                    value={email.text}
                    onChangeText={text => setEmail({ text })}
                    style={{ borderWidth: 1, borderRadius: 4, borderColor: '#444', marginTop: 10, padding: 3 }}
                />
                <Text style={{marginTop: 10, color: '#7800ff', fontSize: 16}}>Senha:</Text>
                <TextInput
                    className="password-input"
                    autoCompleteType="password"
                    keyboardType="email-address"
                    secureTextEntry={true}
                    label='Senha'
                    value={password.text}
                    onChangeText={text => setPassword({ text })}
                    style={{ borderWidth: 1, borderRadius: 4, borderColor: '#444', marginTop: 10, marginBottom: 5, padding: 3 }}
                />
                <Button 
                    type="submit" 
                    className="submit-login" 
                    title="Entrar" 
                    disabled={(handleValidEmail(email.text) || password.text === '') ? false : true} 
                    onPress={handleLogin}
                    color="#7800ff"
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#7800ff',
        borderBottomWidth: 2,
        padding: 16,
        paddingTop: 55
    },
    headerImage: {
        height: 45,
        width: 250
    },
    title: {
        color: '#7800ff',
        fontSize: 30,
        padding: 16
    }
});
