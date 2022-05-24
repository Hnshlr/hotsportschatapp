import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, TextInput, Button, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from './../functions/Firebase.js';
import Popup from './../functions/Popup.js';
import auth from '@react-native-firebase/auth';

import styles from './../styles/Styles.js';
import connexionStyles from '../styles/connexion.js';

const Connexion = ({ navigation }) => {
  const [mode, setMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerif, setPasswordVerif] = useState('');
  const [connected, setConnected] = useState('');
  const [userName, setuserName] = useState("");


  useEffect(() => {
    firebase.setupFirebase();

    auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('ConversationsList');
      }
    });
  }, [])

  const createUser = () => {

    if(password == passwordVerif && password !='' && email != '' ){
      firebase.createUser(email.replace(/ /g,''), password.replace(/ /g,''), userName.replace(/ /g, ''));

      auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace('ConversationsList');
        }
     });
    }
    else {
      alert("Les mots de passe ne sont pas identiques / l'email donnée est invalide");
    }

}

  const connectUser = () => {
    if(password != '' && email != ''){
      firebase.connectUser(email.replace(/ /g,''), password.replace(/ /g,''));

      auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace('ConversationsList');
        }
     });
    }
    else {
      alert("Veuillez remplir tous les champs");
    }

  }

  return (
    <View style={{ flex: 1 }}>

    <View style={styles.body}>

      <View style={connexionStyles.container}>



        {mode ? (
          <View>

          <View style={{justifyContent: 'flex-start', textAlign: 'left', marginVertical: 5, marginTop: 20}}>
             <Text style={{color: "#006a43", textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>Connexion</Text>
          </View>

            <View style={connexionStyles.container_buttons}>
              <TextInput
                style={[connexionStyles.input]}
                onChangeText={val => setEmail(val)}
                value={email}
                placeholder="Adresse Mail"
                keyboardType="email-address"
                autoComplete="email"
              />

              <TextInput
                style={[connexionStyles.input]}
                onChangeText={val => setPassword(val)}
                value={password}
                placeholder="Mot de passe"
                secureTextEntry={true}
              />


           </View>

           <TouchableHighlight underlayColor='rgba(2, 169, 244, 0.5)' style={connexionStyles.button} onPress={() => connectUser()}>
             <Text style={connexionStyles.text}>Connexion</Text>
           </TouchableHighlight>

           <View style={{justifyContent: 'flex-start', textAlign: 'left', marginVertical: 5, marginBottom: 10}}>
              <Text style={{color: "#006a43", textAlign: 'left', textDecorationLine: 'underline', fontSize: 16}} onPress={() => setMode(false)}>Inscrivez vous ici</Text>
           </View>

          </View>
        ):(
          <View>

          <View style={{justifyContent: 'flex-start', textAlign: 'left', marginVertical: 5, marginTop: 20}}>
             <Text style={{color: "#006a43", textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>Inscription</Text>
          </View>

            <View style={connexionStyles.container_buttons}>
              <TextInput
                style={[connexionStyles.input]}
                onChangeText={val => setEmail(val)}
                value={email}
                placeholder="Adresse Mail"
                keyboardType="email-address"
                autoComplete="email"
              />

              <TextInput
                style={[connexionStyles.input]}
                onChangeText={val => setuserName(val)}
                value={userName}
                placeholder="Nom d'utilisateur"
                keyboardType="email-address"
              />

              <TextInput
                style={[connexionStyles.input]}
                onChangeText={val => setPassword(val)}
                value={password}
                placeholder="Mot de passe"
                secureTextEntry={true}
              />

              <TextInput
                style={[connexionStyles.input]}
                onChangeText={val => setPasswordVerif(val)}
                value={passwordVerif}
                placeholder="Vérification Mot de passe"
                secureTextEntry={true}
              />


           </View>

           <TouchableHighlight underlayColor='rgba(2, 169, 244, 0.5)' style={connexionStyles.button} onPress={() => createUser()}>
             <Text style={connexionStyles.text}>Inscription</Text>
           </TouchableHighlight>

           <View style={{justifyContent: 'flex-start', textAlign: 'left', marginVertical: 5, marginBottom: 10}}>
              <Text style={{color: "#006a43", textAlign: 'left', textDecorationLine: 'underline', fontSize: 16}} onPress={() => setMode(true)}>Connectez vous ici</Text>
           </View>

          </View>
        )}



      </View>

    </View>




    </View>

  );

}

const storeData = async (value, key) => {
  try {
    await AsyncStorage.setItem('@'+key, value);
    console.log("saved: "+value);
  } catch (e) {
      // saving error

  }
}



export default Connexion;
