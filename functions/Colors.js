import React, { useState, useEffect, useRef } from 'react';
import { footerStylesheet, Text, View, ScrollView, Image, Animated, TextInput, Button, TouchableHighlight, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getColor = (type) => {
  var backgroundColor = "#006AFF";
  var userMessageColor = "#0084ff";
  var receiverMessageColor = "#e4e6eb";

  switch (type) {
    case "backgroundColor":
      return backgroundColor;
      break;

    case "userMessageColor":
      return userMessageColor;
      break;

    case "receiverMessageColor":
      return receiverMessageColor;
      break;

    default:
      break;
  }

};
