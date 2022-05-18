import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, FlatList, TextInput, Button, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from './../functions/Firebase.js';
import database from '@react-native-firebase/database';
import Popup from './../functions/Popup.js';
import uuid from 'react-native-uuid';

import chatStyles from '../styles/chatStyles.js';

const ChatPage = () => {
  const [conversations, setConversations] = useState(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [messLoaded, setMessLoaded] = useState(false);

  const getMessages = () => {
   //console.log("try to fetch from database");

   database()
   .ref('/Chat/Messages')
   .orderByChild('date')
   .on('value', snapshot => {

       let data = snapshot.val();

      if(data != null){
       let keys = Object.keys(data);

       let tab = [];
       let i=0;

       keys.forEach((key) => {
         //console.log(Object.values(data[key]));
         /*
         tab[i] = Object.values(data[key]);
         tab[i].unshift(key);
         i++;
         */

         tab.push({
           key: key,
           value: data[key]
         });

       });

        //console.log(tab.reverse());


        setConversations(tab.reverse());
     }

     });
  }



  const displayMessages = () => {
    //console.log("Display Messages");

    while(conversations == null){}



    return (
      <View>
      {conversations?.map((item, i) => {
        //console.log(item.value.message);
        if(userId == item.value.sender){
          return (
            <View key={item.key}>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 18}}>{item.value.message}</Text>
            </View>
          );
        }else {
          return (
            <View key={item.key}>
              <Text style={{width: "100%", textAlign: 'left', fontSize: 18}}>{item.value.message}</Text>
            </View>
          );
        }


      })}
      </View>
    );



  }

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem('@'+key)
      if(value !== null) {
        //console.log("get Data: "+value);
        // value previously stored

        switch (key) {
          case "Id":
            setUserId(value);
            break;

          default:
            break;
        }

      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() =>{
    getMessages();
    getData("Id");

    const timer = setTimeout(() => {
      setMessLoaded(true);
    }, 2500);
    return () => {
      clearTimeout(timer);
    }

  }, []);

  return (
    <View style={chatStyles.root}>

      <View style={chatStyles.body}>

      <ScrollView style={chatStyles.displayMessages}>

      {messLoaded && conversations != null ? displayMessages():null}

      </ScrollView>

      <View style={chatStyles.textInput}>
        <Button title={"Envoyer"} onPress={() => {
          //console.log("button");
          let id = uuid.v4();
          var day = new Date().getDate(); //To get the Current Date
          var month = new Date().getMonth() + 1; //To get the Current Month
          var year = new Date().getFullYear(); //To get the Current Year
          var hours = new Date().getHours(); //To get the Current Hours
          var min = new Date().getMinutes(); //To get the Current Minutes
          var sec = new Date().getSeconds();

          let date = day + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
          console.log(date);
          firebase.sendMessage(id, userId, "LrO9c50Ec0W9r9AaclHV97jdiP82", message, date.toString());

        }}/>
        <TextInput
            style={chatStyles.input}
            onChangeText={val => setMessage(val)}
            value={message}
            placeholder="Write your message"
          />
      </View>



      </View>

    </View>
  );
}



export default ChatPage;
