import React, { useState, useEffect, useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Switch, FlatList, TextInput, Button, TouchableHighlight, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from './../functions/Firebase.js';
import database from '@react-native-firebase/database';
import Popup from './../functions/Popup.js';
import uuid from 'react-native-uuid';

import chatStyles from '../styles/chatListStyles.js';

const ChatList = ({navigation}) => {
  const [conversations, setConversations] = useState(null);
  const [userId, setUserId] = useState('');
  const [userObj, setUserObj] = useState('./../src/profil1.png');
  const [convLoaded, setConvLoaded] = useState(false);
  const [userList, setUserList] = useState(false);
  const [createConv, setCreateConv] = useState('');
  const [createGroup, setCreateGroup] = useState('');
  const [groupUsers, setGroupUsers] = useState('');

  const getConversations = () => {

    getUsers("all");


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


          let receiverName, receiverIcon;
          userList?.map((conv, i) => {
            if(userList[i].key == item.value.people1 && userId == item.value.people2 || userList[i].key == item.value.people2 && userId == item.value.people1){
              receiverName = userList[i].value.userName;
              receiverIcon = userList[i].value.icon;
            }

          });

          //console.log(receiverIcon);

          return (
            <View key={item.key} style={{marginBottom: 5}}>
              <TouchableOpacity activeOpacity={0.5} style={chatStyles.convButton} onPress={() => {
                navigation.navigate('ChatPage', {id: item.value.id, userId: userId, receiverId: receiverId, receiverName: receiverName, receiverIcon: receiverIcon})}}>
                <Image
                  style={[chatStyles.img]}
                  source={{
                    uri: receiverIcon
                  }}
                />
                <View>
                  <Text style={{width: "100%", textAlign: 'left', fontSize: 16, fontWeight: "bold"}}>{receiverName}</Text>
                  <Text style={{width: "100%", textAlign: 'right', fontSize: 16, fontWeight: "bold"}}>{item.value.date}</Text>
                </View>
                
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

  const getUsers = (spec) => {
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

          if(spec == "icon"){
            if(userId == key){
              setUserObj(data[key].icon);
            }
          }
        
        });

        if(spec == "all"){
          //console.log(tab);
          setUserList(tab);
        }
        



      }

      });
  }

  const createGroupFunction = () => {
    return (
      <View style={{position: 'absolute', top:0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center',}}>
      <View style={{height: "50%", width: "60%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15,borderWidth: 2, borderColor: "#006AFF"}}>
          <View style={{height: "75%", width:"100%", justifyContent: "center"}}> 
            <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 16, marginBottom: 15, textAlign: "center"}}>Nouveau Groupe :</Text>
            <ScrollView style={{width: "80%", marginBottom: 15, }}>

            {userList?.map((item, i) => {

              if(item.value.id != userId){

                return (
                  <View key={item.key} style={{alignItems: 'center', marginBottom: 10}}>
                    <TouchableOpacity activeOpacity={1} style={[chatStyles.convButton, {width: '100%'}]} onPress={() => {
                      let id = uuid.v4();

                      conversations?.map((conv, i) => {
                        if(conv.value.people1 == item.value.id  && conv.value.people2 == userId || conv.value.people2 == item.value.id && conv.value.people1 == userId){
                          id = conv.key;
                        }
                      });
                      
                      

                    }}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", }}>
                      <Image
                          style={{height: 35, width: 35, borderRadius: 35}}
                          source={{
                            uri: item.value.icon
                          }}
                        />
                        <Text style={{color: "#0084ff", fontSize: 15, fontWeight: "bold"}}>{item.value.userName}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            })


            }
            </ScrollView>
          </View>

          <View style={{height: "25%", width: "100%"}}>
            <Text style={{fontWeight: "bold", marginLeft: 10}}>Group Members : {groupUsers}</Text>
            <Text style={{marginLeft: 10}}>Hans Haller, Nader Chebbo</Text>
            <TouchableOpacity activeOpacity={1} style={{width: "100%", justifyContent: "center", alignItems: "center"}} onPress={() => {
                  setCreateGroup(false);
                }}>
              <Text style={{backgroundColor: "#0084ff", justifyContent: "center", color: "white", width:"30%", alignItems: "center", textAlign: "center", padding: 5, marginTop: 10, borderRadius: 15, }}>Créer</Text>     
              </TouchableOpacity>
          </View>
          
        </View>
      </View>
    );

  }

  const displayUsers = () => {
    //console.log("user Select");

    return (
      <View style={{position: 'absolute', top:0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center',}}>
      <View style={{height: "50%", width: "60%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15,borderWidth: 2, borderColor: "#006AFF"}}>
          <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 16, marginBottom: 15}}>Nouvelle discussion :</Text>
          <ScrollView style={{width: "80%", marginBottom: 15, }}>

          {userList?.map((item, i) => {

            if(item.value.id != userId){

              return (
                <View key={item.key} style={{alignItems: 'center', marginBottom: 10}}>
                  <TouchableOpacity activeOpacity={1} style={[chatStyles.convButton, {width: '100%'}]} onPress={() => {
                    let id = uuid.v4();
                    
                    conversations?.map((conv, i) => {
                      if(conv.value.people1 == item.value.id  && conv.value.people2 == userId || conv.value.people2 == item.value.id && conv.value.people1 == userId){
                        id = conv.key;
                      }
                    });
                    
                    navigation.navigate('ChatPage', {id: id, userId: userId, receiverId: item.value.id, receiverName: item.value.userName, receiverIcon: item.value.icon});

                    setCreateConv(false);
                  }}>
                  <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", }}>
                    <Image
                        style={{height: 35, width: 35, borderRadius: 35}}
                        source={{
                          uri: item.value.icon
                        }}
                      />
                      <Text style={{color: "#0084ff", fontSize: 15, fontWeight: "bold"}}>{item.value.userName}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          })


          }
          </ScrollView>
        </View>
      </View>
    );

  }


  useEffect(() =>{
    getConversations();
    getData("Id");
    

    const timer = setTimeout(() => {
      setConvLoaded(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    }

  }, []);


  return (
    <View style={chatStyles.root}>

      <View style={chatStyles.chatHeader}>
        <TouchableOpacity activeOpacity={1}>
          <Image source={{
                    uri: userObj
                  }} 
                  style={{marginLeft: 10, height: 48, width: 48, borderRadius: 48}}/>
        </TouchableOpacity>
        <Text style={{color: "black", marginHorizontal: 20, fontSize: 26, fontWeight: 'bold'}}>Discussions</Text>
        <TouchableOpacity activeOpacity={1} style={[chatStyles.convButton, {marginRight: 10, marginTop: 5, marginBottom: 5}]} onPress={() => {
            setCreateGroup(!createGroup);
          }}>
            <Image source={require('./../src/friends.png')} style={{marginLeft: 10, height: 35, width: 35}}/>
          </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[chatStyles.convButton, {marginRight: 10, marginTop: 5, marginBottom: 5}]} onPress={() => {
            setCreateConv(!createConv);
          }}>
            {createConv ? (
              <Image source={require('./../src/minus.png')} style={{marginLeft: 10, height: 35, width: 35}}/>
            ):(
              <Image source={require('./../src/plus.png')} style={{marginLeft: 10, height: 35, width: 35}}/>
            )}

          </TouchableOpacity>
      </View>

      <View style={chatStyles.scrollContainer}>

        <ScrollView style={chatStyles.displayMessages}>

        {convLoaded && conversations != null ? displayConversations():null}
        {userId != null ? getUsers("icon"):null}
        

        </ScrollView>

      </View>


      {createConv ? displayUsers():null}
      {createGroup ? createGroupFunction():null}



    </View>
  );
}



export default ChatList;
