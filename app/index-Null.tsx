// import { Image, StyleSheet, Platform } from "react-native";

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { Icon, MD3Colors,Button  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLinkTo } from '@react-navigation/native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { height, width } from "@/constants/Dimensions";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
export default function HomeScreen() {
  const linkTo = useLinkTo();
  const h = height;
  const w = width
  return (
    <View style={styles.container}>
       <View style={{height: h*0.3, display:'flex', justifyContent:"flex-end"}}>
      <Image
        source={require("@/assets/images/logo-LARGE.png")} // Replace with your QR code image
        style={styles.qrIcon}
      />
      </View>
      <View style={{height: h*0.5, display:'flex', justifyContent:"flex-end"}}>
        <Text style={styles.description}>
        Profitez gratuitement de nos fonctionnalités et simplifiez-vous la vie avec nous.
        </Text>
        {/* <TouchableOpacity
          style={styles.startButton}
          onPress={() => linkTo('/(tabs)')}
          
        >
          
          <Text style={styles.startButtonText}>Let's Start</Text>
          <Icon
    source="camera"
    color={MD3Colors.error50}
    size={20}
  />
        </TouchableOpacity> */}
          <View style={styles.container2}>
      <Button
        mode="contained"
        onPress={() => linkTo('/(tabs)')}
        contentStyle={styles.buttonContent} // Customize the internal content
        labelStyle={styles.label} // Customize the text
        style={styles.button} // Customize the button size and background
        icon={({ size, color }) => (
          <Icon source="arrow-right" size={30} color={color} />  // Custom size for the icon
        )} // Custom icon size (24 here)
        
      >
  Commençons
      </Button>
    </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background, // Dark background
    height:height,
    paddingTop: 50
  },
  qrIcon: {
    width: 200,
    height: 200,
    marginBottom: 0,
  },
  description: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: "#F7B500",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    display:"flex",
   
  },
  startButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
      backgroundColor: '#F7B500', // Custom background color
      width: width*0.9, // Set button width
      height: 60, // Set button height
      justifyContent: 'center',
      borderRadius: 8,
  },
  buttonContent: {
    flexDirection: 'row-reverse', // Place the text before the icon
    paddingVertical: 10, // Adjust button padding (for height control)
  },
  label: {
    fontSize: 18, // Increase font size
    color: Colors.dark.background, // Text color
    fontWeight:700
  },
});
