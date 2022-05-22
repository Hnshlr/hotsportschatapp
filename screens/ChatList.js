import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, FlatList, TextInput, Button, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from './../functions/Firebase.js';
import database from '@react-native-firebase/database';
import Popup from './../functions/Popup.js';
import uuid from 'react-native-uuid';

import chatStyles from '../styles/chatStyles.js';

const ChatList = ({navigation}) => {
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


          tab.push({
            key: key,
            value: data[key]
          });

        });

         //console.log(tab.reverse());
         let dates = tab.sort((b:any, a:any) => new Date(b.date).getTime() - new Date(a.date).getTime());
         //console.log(dates.reverse());

         setConversations(dates.reverse());
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
        if(userId == item.value.people1 || userId == item.value.people2){
          return (
            <View key={item.key}>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 12}}>Id: {item.value.id}</Text>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 12}}>P1: {item.value.people1}</Text>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 12}}>P2: {item.value.people2}</Text>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 12}}>date: {item.value.date}</Text>
              <Button title={"Afficher"} onPress={() => {

                let receiverId;
                if (userId == item.value.people1) {
                  receiverId = item.value.people2;
                }else {
                  receiverId = item.value.people1;
                }
                navigation.navigate('ChatPage', {id: item.value.id, userId: userId, receiverId: receiverId})
              }}/>
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
    getConversations();
    getData("Id");

    const timer = setTimeout(() => {
      setConvLoaded(true);
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
