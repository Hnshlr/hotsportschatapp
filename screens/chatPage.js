import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, FlatList, TextInput, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from './../functions/Firebase.js';
import database from '@react-native-firebase/database';
import Popup from './../functions/Popup.js';
import uuid from 'react-native-uuid';
import Moment from 'moment';

import chatStyles from '../styles/chatStyles.js';
import styles from '../styles/Styles.js';

const ChatPage = ({route, navigation}) => {
  const [conversations, setConversations] = useState(null);
  const [message, setMessage] = useState('');
  const [messLoaded, setMessLoaded] = useState(false);


  const getMessages = (id) => {
   //console.log("try to fetch from database: "+id);

   database()
   .ref('/Chat/Messages/'+id)
   .orderByChild('date')
   .on('value', snapshot => {

      let data = snapshot.val();
      //console.log(data);

      if(data != null){
       let keys = Object.keys(data);

       let tab = [];
       let i=0;

       keys.forEach((key) => {
         //console.log(Object.values(data[key]));

         tab.push({
           key: key,
           value: data[key]
         });

       });

        //console.log("tab :"+tab);
        let dates = tab.sort((b:any, a:any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        dates.reverse();

        console.log(dates);

        setConversations(dates);
     }

     });
  }



  const displayMessages = (userId) => {
    //console.log("Display Messages");

    return (
      <View>
      {conversations?.map((item, i) => {
        //console.log(item.value.message);
        if(userId == item.value.sender){
          return (
            <View key={item.key} style={chatStyles.userMessage}>
              <Text style={[{width: "40%", fontSize: 14, color: "white"}, chatStyles.userMessageBuble]}>{item.value.message}</Text>
            </View>
          );
        }else {
          return (
            <View key={item.key} style={chatStyles.receiverMessage}>
              <Text style={[{width: "40%", fontSize: 14}, chatStyles.receiverMessageBuble]}>{item.value.message}</Text>
            </View>
          );
        }


      })}
      </View>
    );



  }


  useEffect(() =>{
    //console.log(route.params.receiverName);
    //console.log(route.params);
    getMessages(route.params.id);

    const timer = setTimeout(() => {
      setMessLoaded(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }

  }, []);

  return (
    <View style={chatStyles.root}>


      <View style={chatStyles.chatHeader}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image source={require('./../src/arrow-left.png')} style={{marginLeft: 10, height: 48, width: 48}}/>
        </TouchableOpacity>
        <Text style={{color: "white", marginHorizontal: 20}}>{route.params.receiverName}</Text>
        <Image source={require('./../src/profil1.png')} style={styles.img}/>
      </View>

      <View style={chatStyles.scrollContainer}>
        <ScrollView style={chatStyles.displayMessages}>

        {messLoaded && conversations != null ? displayMessages(route.params.userId):null}

        </ScrollView>
      </View>

      <View style={chatStyles.textInput}>

        <TextInput
            style={chatStyles.input}
            onChangeText={val => setMessage(val)}
            value={message}
            placeholder="Write your message"
          />

        <TouchableOpacity activeOpacity={1} style={chatStyles.sendButton} onPress={() => {
          //console.log("button");
          var day = new Date().getDate(); //To get the Current Date
          var month = new Date().getMonth() + 1; //To get the Current Month
          var year = new Date().getFullYear(); //To get the Current Year
          var hours = new Date().getHours(); //To get the Current Hours
          var min = new Date().getMinutes(); //To get the Current Minutes
          var sec = new Date().getSeconds();

          function checkZero(param){
            if(param < 10){
              param = '0'+param;
            }
            return param;
          }

          hours = checkZero(hours);
          min = checkZero(min);
          sec = checkZero(sec);

          let date = day + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec;
          //console.log(date);
          //user
          firebase.sendMessage(route.params.id, route.params.userId, route.params.receiverId, message, date.toString());

          //receiver
          //firebase.sendMessage(route.params.id, route.params.receiverId, route.params.userId, message, date.toString());
        }}>
          <Image source={require('./../src/send.png')} style={{height: 15, width: 15}}/>
        </TouchableOpacity>

      </View>


    </View>
  );
}



export default ChatPage;
