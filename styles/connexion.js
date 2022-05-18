import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet } from 'react-native';

const autorisationStyles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor: '#047db7',
    borderWidth: 2,
    elevation: 3,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },

  container_buttons: {
    alignItems: 'flex-start',
  },

  input: {
    height: 60,
    width: 250,
    borderBottomWidth: 1,
    borderColor: '#02a9f4',
    marginBottom: 10,
  },

  button:{
    marginTop: 25,
    marginBottom: 10,
    borderRadius: 20,
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: "#02a9f4",
  },

  classicText:{
    fontSize: 14,
    textAlign: 'justify',
  },

  mentionSup:{
    fontSize: 11,
    textAlign: 'justify',
  },

  text:{
    color: "#fff",
    fontWeight: 'bold'
  }

});

export default autorisationStyles;
