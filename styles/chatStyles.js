import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet } from 'react-native';
import {getColor} from './../functions/Colors.js';

const backgroundColor = getColor("backgroundColor");
const userMessageColor = getColor("userMessageColor");
const receiverMessageColor = getColor("receiverMessageColor");

const chatStyles = StyleSheet.create({

  root:{
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  input:{
    marginBottom: 0,
    textAlign: 'center',
    borderRadius: 15,
    padding: 5,
    backgroundColor: "#f3f3f5",
    borderRadius: 15,
    width: "80%",
    marginRight: 10,
  },
  textInput:{
    height: "8%",
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  sendButton:{
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },

  scrollContainer:{
    height: "75%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  displayMessages:{
    height: "100%",
    width: "95%",
    marginVertical: 20,
  },
  userMessage:{
    marginVertical: 10,
    width: '100%',
    alignItems: 'flex-end',
  },
  receiverMessage:{
    width: '100%',
    alignItems: 'flex-start'
  },
  userMessageBuble:{
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderColor: 'white',
    padding: 15,
    backgroundColor: userMessageColor,
  },
  receiverMessageBuble:{
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: 'white',
    padding: 15,
    backgroundColor: receiverMessageColor,
  },
  chatHeader:{
    height: "17%",
    backgroundColor: "white",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 40,
    elevation: 10,
    alignItems: 'center',
  },

  convButton:{
    marginTop: 10,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },

  img:{
    width: "40%",
    height: 150,
  },


})

export default chatStyles;
