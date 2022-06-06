import 'react-native-gesture-handler';
import React, { Component, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Button, TouchableHighlight, TouchableOpacity, Slider, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';


import Login from './screens/login.js';
import Chat from './screens/chatPage.js';
import ChatList from './screens/ChatList.js';
import {getColor} from "./functions/Colors.js";

const backgroundColor = getColor("backgroundColor");

const Stack = createStackNavigator();

const MyStack = () => {


  return (
    <NavigationContainer>
      <StatusBar
      backgroundColor="transparent"
      translucent
      barStyle="light-content"
      />

      <Stack.Navigator
      initialRouteName="Connexion"
      screenOptions={({ route, navigation }) => ({
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled:true,
      })}
      >

        <Stack.Screen
          component={Login}
          name="Connexion"
          mode="modal"
          options={{ title: 'Connexion',
          headerShown: true,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: "center",
         }}
        />

        <Stack.Screen
          component={Chat}
          name="ChatPage"
          mode="modal"
          options={{ title: 'Chat',
          headerShown: false,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: "center",
         }}
        />

        <Stack.Screen
          component={ChatList}
          name="ConversationsList"
          mode="modal"
          options={({navigation}) => ({ title: 'Conversations',
          headerShown: false,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: "left",
        })}
        />




      </Stack.Navigator>
    </NavigationContainer>

  );
};



export default MyStack;
