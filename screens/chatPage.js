import React, { useState, useEffect, useRef, useCallback} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, FlatList, TextInput, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from './../functions/Firebase.js';
import database from '@react-native-firebase/database';
import Popup from './../functions/Popup.js';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import Moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import chatStyles from '../styles/chatStyles.js';
import styles from '../styles/Styles.js';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

const ChatPage = ({route, navigation}) => {
  const [conversations, setConversations] = useState(null);
  const [message, setMessage] = useState('');
  const [messLoaded, setMessLoaded] = useState(false);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const selectImage = () => {
    console.log("open library");
    launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {

      //console.log(response.assets[0].uri);

      const source = { uri: response.assets[0].uri };

      // You can also display the image using data:
      //const source = { uri: 'data:image/jpeg;base64,' + response.data };

      //console.log(source);
      setImage(source);
    }
    });
  };

  const uploadImage = async (date) => {
    console.log("trying to send image");

    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);
    alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage(null);

    await storage().ref('/'+filename).getDownloadURL().then(function(url) {
        console.log(url);
        firebase.sendMessage(route.params.id, route.params.userId, route.params.receiverId, url, date.toString());
    }, function(error){
        console.log(error);
    });


  };

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

        //console.log(dates);

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
          let uri = item.value.message;
          let testImage = uri.split(":");
          if(testImage[0] == "https"){
            return (
              <View key={item.key} style={chatStyles.userMessage}>
                <Image
                  style={[{resizeMode: "contain"}, chatStyles.img, chatStyles.userMessageBuble]}
                  source={{
                    uri: item.value.message,
                  }}
                />
              </View>
            );
          }
          else {
            return (
              <View key={item.key} style={chatStyles.userMessage}>
                <Text style={[{width: "40%", fontSize: 14, color: "white"}, chatStyles.userMessageBuble]}>{item.value.message}</Text>
              </View>
            );
          }
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
    //console.log(route.params);
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
        <Text style={{color: "black", marginHorizontal: 20, fontSize: 18, fontWeight: 'bold'}}>{route.params.receiverName}</Text>
        <Image source={{uri : route.params.receiverIcon}} style={{width: 50, height: 50, borderRadius : 50,}}/>
      </View>

      <View style={chatStyles.scrollContainer}>
        <ScrollView style={chatStyles.displayMessages}>

        {messLoaded && conversations != null ? displayMessages(route.params.userId):null}

        </ScrollView>
      </View>

      <View style={chatStyles.textInput}>
      <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', padding: 3}} onPress={() => selectImage()}>
        <Image source={require('./../src/image_picker.png')} style={{height: 25, width: 25}}/>
      </TouchableOpacity>


      {image != null ? (
        <View style={chatStyles.input}>
          <Image
            style={{height: 50, width: 50}}
            source={require('./../src/baki.jpg')}
          />
        </View>
      ):(
        <TextInput
            style={chatStyles.input}
            onChangeText={val => setMessage(val)}
            value={message}
            placeholder="Write your message"
          />
      )}




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

          if(image != null){
            uploadImage(date);
          }

          if(message != null && message != ""){
            //user
            firebase.sendMessage(route.params.id, route.params.userId, route.params.receiverId, message, date.toString());

            //receiver
            //firebase.sendMessage(route.params.id, route.params.receiverId, route.params.userId, message, date.toString());
          }

        }}>
          <Image source={require('./../src/send.png')} style={{height: 25, width: 25}}/>
        </TouchableOpacity>

      </View>


    </View>
  );
}



export default ChatPage;
