import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet } from 'react-native';
import {getColor} from './../functions/Colors.js';


var color = getColor('color');
var text= getColor('text');


const styles = StyleSheet.create({

  header: {
    backgroundColor: '#02a9f4',
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },

  header_icon: {
    backgroundColor: '#02a9f4',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: "row",
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 12,
  },

  menu: {
    backgroundColor: '#02a9f4',
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "row",
  },

  titleMenu: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 15,
  },

  slider: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '95%',
    width: '33%',
    paddingHorizontal: 32,
    backgroundColor: color,
    borderStyle: 'solid',
    borderBottomColor: color,
    borderBottomWidth: 4,
    opacity:0.8,
  },

  buttonActive: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '95%',
    width: '33%',
    paddingHorizontal: 32,
    backgroundColor: color,
    borderStyle: 'solid',
    borderBottomColor: '#fff',
    borderBottomWidth: 4,
  },

  body: {
    flex: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff4e5",
  },

  img: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 100,
  },

  imgArrow: {
    height: 150,
    width: 150,
    marginVertical: 20,
  },

  homeImg: {
    height: 200,
    width: 200,
  },

  homeScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cff0ff",
  },

  textDesc: {
    width:'70%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 15,
    marginBottom: 10,
  },

  card: {
    elevation: 3,
  },

  scoreBox: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '90%',
      marginTop : 15,
      marginBottom: 15,
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

  valueScoreBox: {
    marginTop: 20,
    marginBottom: 20,
    width:150,
    height: 150,
    borderWidth: 2,
    borderColor:"#F4AD51",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  valueScoreText: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 5,
  },

  scoreEvaluation: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },

  setGreen: {
    borderColor: "green",
    color:'green',
  },

  setYellow: {
    borderColor: "#ffd966",
    color:'#ffd966',
  },

  setOrange: {
    borderColor: "orange",
    color:'orange',
  },

  setRed: {
    borderColor: "red",
    color:'red',
  },

  setGold: {
    borderColor: "gold",
    color: "gold",
  },

  setPurple: {
    borderColor: "purple",
    color: "purple",
  },


  circle:{
    backgroundColor: '#02a9f4',
    height:  250,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150
  }

});

export default styles;
