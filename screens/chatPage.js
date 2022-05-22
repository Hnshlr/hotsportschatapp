import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, FlatList, TextInput, Button, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from './../functions/Firebase.js';
import database from '@react-native-firebase/database';
import Popup from './../functions/Popup.js';
import uuid from 'react-native-uuid';
import Moment from 'moment';

import chatStyles from '../styles/chatStyles.js';

const ChatPage = ({route}) => {
  const [conversations, setConversations] = useState(null);
  const [message, setMessage] = useState('');
  const [messLoaded, setMessLoaded] = useState(false);



  const getMessages = (id) => {
   console.log("try to fetch from database: "+id);

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
        console.log(dates.reverse());

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
            <View key={item.key} style={{marginVertical: 10,width: '100%', flex: 1, alignItems: 'flex-end'}}>
              <Text style={{width: "40%", textAlign: 'right', fontSize: 18}}>{item.value.message}</Text>
            </View>
          );
        }else {
          return (
            <View key={item.key} style={{width: '100%', flex: 1, alignItems: 'flex-start'}}>
              <Text style={{width: "40%", textAlign: 'left', fontSize: 18}}>{item.value.message}</Text>
            </View>
          );
        }


      })}
      </View>
    );



  }


  useEffect(() =>{
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

      <View style={chatStyles.body}>

      <ScrollView style={chatStyles.displayMessages}>

      {messLoaded && conversations != null ? displayMessages(route.params.userId):null}

      </ScrollView>

      <View style={chatStyles.textInput}>
        <Button title={"Envoyer"} onPress={() => {
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
