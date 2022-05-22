import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet } from 'react-native';

const chatStyles = StyleSheet.create({

  root:{
    width: "100%",
    height: "100%",
    backgroundColor: "#fff4e5",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  input:{
    marginBottom: 0,
    textAlign: 'center',
    borderRadius: 15,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 15,
    width: "80%",
    marginRight: 10,
  },
  textInput:{
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  sendButton:{
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006a43',
  },

  scrollContainer:{
    flex: 10,
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
    backgroundColor: "#006a43",
  },
  receiverMessageBuble:{
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: 'white',
    padding: 15,
    backgroundColor: "#e6e6e6",
  },
  chatHeader:{
    flex: 1,
    backgroundColor: '#006a43',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  convButton:{
    marginTop: 10,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006a43',
  },


})

export default chatStyles;
