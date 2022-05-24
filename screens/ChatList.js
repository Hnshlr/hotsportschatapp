import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, FlatList, TextInput, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
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
  const [userList, setUserList] = useState(false);
  const [createConv, setCreateConv] = useState('');

  const getConversations = () => {

    database()
    .ref('/Chat/Users/')
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

        //console.log(tab);
        setUserList(tab);
      }

      });


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

          let receiverId;
          if (userId == item.value.people1) {
            receiverId = item.value.people2;
          }else {
            receiverId = item.value.people1;
          }


          let receiverName;
          userList?.map((conv, i) => {
            if(userList[i].key == item.value.people1 && userId == item.value.people2 || userList[i].key == item.value.people2 && userId == item.value.people1){
              receiverName = userList[i].value.userName;
            }
          });

          return (
            <View key={item.key} style={{marginVertical: 10}}>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 12}}>Id: {item.value.id}</Text>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 12}}>Destinataire: {receiverName}</Text>
              <Text style={{width: "100%", textAlign: 'right', fontSize: 12}}>date: {item.value.date}</Text>
              <TouchableOpacity activeOpacity={1} style={chatStyles.convButton} onPress={() => {
                navigation.navigate('ChatPage', {id: item.value.id, userId: userId, receiverId: receiverId, receiverName: receiverName})}}>
                <Text style={{color: "white"}}>Accéder</Text>
              </TouchableOpacity>

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

  const displayUsers = () => {
    //console.log("user Select");

    return (
      <View style={{alignItems: 'center'}}>
        <ScrollView style={{width: "60%", backgroundColor: '#e6e6e6', borderTopLeftRadius:15, borderTopRightRadius: 15, borderBottomLeftRadius: 15}}>
        {userList?.map((item, i) => {

            return (
              <View key={item.key} style={{alignItems: 'center', marginBottom: 10}}>
                <TouchableOpacity activeOpacity={1} style={[chatStyles.convButton, {width: '80%'}]} onPress={() => {
                  let id = uuid.v4();

                  conversations?.map((conv, i) => {
                    if(conv.value.people1 == item.value.id  && conv.value.people2 == userId || conv.value.people2 == item.value.id && conv.value.people1 == userId){
                      id = conv.key;
                    }
                  });

                  navigation.navigate('ChatPage', {id: id, userId: userId, receiverId: item.value.id, receiverName: item.value.userName});

                  setCreateConv(false);
                }}>
                  <Text style={{color: "white"}}>{item.value.userName}</Text>
                </TouchableOpacity>
              </View>
            );
          })


        }
        </ScrollView>
      </View>
    );

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

      <View style={chatStyles.scrollContainer}>

        <ScrollView style={chatStyles.displayMessages}>

        {convLoaded && conversations != null ? displayConversations():null}

        </ScrollView>

      </View>

      <View style={{marginTop: 10, width: "100%"}}>

          {createConv ? displayUsers():null}

        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <TouchableOpacity activeOpacity={1} style={[chatStyles.convButton, {marginRight: 10, marginTop: 5, marginBottom: 5}]} onPress={() => {
            setCreateConv(!createConv);
          }}>
            {createConv ? (
              <Image source={require('./../src/minus.png')} style={{height: 20, width: 20}}/>
            ):(
              <Image source={require('./../src/plus.png')} style={{height: 20, width: 20}}/>
            )}

          </TouchableOpacity>
        </View>

      </View>


    </View>
  );
}



export default ChatList;
