import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, FlatList, TextInput, Button, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from './../functions/Firebase.js';
import database from '@react-native-firebase/database';
import Popup from './../functions/Popup.js';
import uuid from 'react-native-uuid';

import chatStyles from '../styles/chatStyles.js';

const ChatList = () => {
  const [conversations, setConversations] = useState(null);
  const [userId, setUserId] = useState('');
  const [convLoaded, setConvLoaded] = useState(false);

  const getConversations = () => {
    database()
    .ref('/Chat/Conversations')
    .on('value', snapshot => {

        let data = snapshot.val();

       if(data != null){
        let keys = Object.keys(data);

        let tab = [];
        let i=0;

        keys.forEach((key) => {
          //console.log(Object.values(data[key]));
          tab[i] = Object.values(data[key]);
          tab[i].unshift(key);
          i++;

          /*
          tab.push({
            key: key,
            value: data[key]
          });
          */
        });

         //console.log(tab.reverse());

         let dates = tab.reverse();
         dates.sort((date1, date2) => date1 - date2);
         console.log(dates);

         setConversations(dates);
      }

      });
  }

  const displayConversations = () => {
    //console.log("Display Messages");

    while(conversations == null){}

    //console.log(userId);


    return (
      <View>
      {conversations?.map((item, i) => {
        //console.log(item);
        if(userId == item[3]){
          return (
            <View key={item[0]}>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 18}}>{item[2]}</Text>
            </View>
          );
        }else {
          return (
            <View key={item[0]}>
              <Text style={{width: "100%", textAlign: 'left', fontSize: 18}}>{item[2]}</Text>
            </View>
          );
        }


      })}
      </View>
    );


  useEffect(() =>{
    getConversations();
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

      {convLoaded && conversations != null ? displayConversations():null}

      </ScrollView>


      </View>

    </View>
  );
}



export default ChatList;
