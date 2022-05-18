import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet } from 'react-native';

const chatStyles = StyleSheet.create({

  root:{
    width: "100%",
    height: "100%",
    backgroundColor: "#fff4e5",
  },

  body:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  input:{
    marginBottom: 0,
    textAlign: 'center',
    height: "65%",
    borderWidth: 1,
    borderColor: 'black',
  },
  textInput:{
    height: "15%",
    width: "100%",
    borderWidth: 1,
    borderColor: 'black',
  },
  displayMessages:{
    width: "95%",
    marginVertical: 20,
  },

})

export default chatStyles;
