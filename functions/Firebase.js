import React from 'react';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBjyfFev6TwfUp6LUC1CHLwgh_dCKsagZs",
  authDomain: "chatapp-5848d.firebaseapp.com",
  databaseURL: "https://chatapp-5848d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatapp-5848d",
  storageBucket: "chatapp-5848d.appspot.com",
  messagingSenderId: "429799447443",
  appId: "1:429799447443:web:5053f96f4b25f053a02666"
};

export function setupFirebase() {
  if (firebase.apps.length === 0) {
      console.log("Setup firebase");
      firebase.initializeApp(firebaseConfig);
  }
}

const storeData = async (value, key) => {
  try {
    await AsyncStorage.setItem('@'+key, value);
    console.log("saved: "+value);
  } catch (e) {
      // saving error

  }
}


export function createUser(email, password, name){
  auth()
  .createUserWithEmailAndPassword(email, password)
  .then((data) => {
    console.log('User account created & signed in!');
    alert("Le compte est bien crée");
    console.log("User ID :",data.user.uid);
    storeData((data.user.uid).toString(), "Id");

    try{
      database().ref('Chat/Users/'+(data.user.uid).toString()).set({
        id: data.user.uid,
        email: email,
        userName: name
      });
      console.log("Success");
    } catch(err) {
      console.log("Error create user: ", err);
    }

    return true;
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      alert("Cette adresse mail est déjà utilisée");
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      alert("L'adresse mail est invalide");
    }

    console.error(error);
    return false;
  });

}

export function connectUser(email, password){
  console.log("connexion");

  auth()
  .signInWithEmailAndPassword(email, password)
  .then((data) => {
    console.log('You are signed in!');
    console.log("User ID :",data.user.uid);

    alert("Vous êtes bien connecté !");

    storeData((data.user.uid).toString(), "Id");

    return true;
    //getFromDatabase(data.user.uid);
    //checkAdmin(data.user.uid);

  })
  .catch(error => {
    if (error.code === 'auth/user-not-found') {
      alert("Ce compte n'existe pas");
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
    return false;
  });

}


export async function sendMessage(id, sender, receiver, message, date){
  console.log("Trying to send message");

  try{

    await database().ref('Chat/Conversations/'+id).set({
      id: id,
      people1: sender,
      people2: receiver,
      date: date
    });
    console.log("Success");

    await database().ref('Chat/Messages/'+id).push({
      sender: sender,
      receiver: receiver,
      message: message,
      date: date
    });
    console.log("Success");
  } catch(err) {
    console.log("Error send message: ", err);
  }
}

export async function saveFile(file){
  const storage = storage().ref('/');
  await storage.putFile(file);
}


export function getMessages(id, sender, receiver){
  console.log("try to fetch from database");

  database()
  .ref('/Chat/')
  .on('value', snapshot => {
      console.log("Success");

    });
}


export function getFromDatabase(id){
  console.log("try to fetch from database");

  database()
  .ref('/Users/'+id)
  .on('value', snapshot => {
      console.log("Success");

      storeData((snapshot.val().firstName).toString(), "userPrenom");
      storeData((snapshot.val().lastName).toString(), "userNom");
      storeData((snapshot.val().Email).toString(), "userMail");
      storeData((snapshot.val().Icon).toString(), "userIcon");

    });

}


export function checkAdmin(id){
  database()
  .ref('/Admins/'+id)
  .on('value', snapshot => {
      console.log("profil: "+snapshot.val());
      if(snapshot.val() != null){
        console.log("Administrateur connecté: "+snapshot.val());
        storeData("true", "Admin");
      }

    });
}
