import React, { useState, useEffect, useRef } from 'react';
import { footerStylesheet, Text, View, ScrollView, Image, Animated, TextInput, Button, TouchableHighlight, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getColor = (type) => {
  var month = 20; //To get the Current Month
  var color;
  var text;


  if(month <= 2){
    color = "#02a9f4";
    text = '#02a9f4';
  }
  else if (3 < month & month <= 5) {
    color = "#ea8692";
    text = '#ea8692';
  }
  else if (6 < month & month <= 8) {
    color = "#ff9900";
    text = 'darkorange';
  }
  else if (9 < month & month <= 11) {
    color = "#c74b36";
    text = '#c74b36';
  }
  else if (month == 12) {
    color = "#30b78a";
    text = '#30b78a';
  }
  else {
    color = "#02a9f4";
    text = '#02a9f4';
  }


  if(type == 'color'){
    return color;
  }
  else if (type == 'text') {
    return text;
  }


};
