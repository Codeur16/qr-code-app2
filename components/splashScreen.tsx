// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
// import * as SplashScreen from "expo-splash-screen";

// // Empêcher l'écran de démarrage de se masquer automatiquement
// SplashScreen.preventAutoHideAsync();

// export default function CustomSplashScreen() {
//   const [isAppReady, setAppReady] = useState(false);

//   useEffect(() => {
//     // Simuler un chargement (par exemple, charger des polices, des données, etc.)
//     const prepareApp = async () => {
//       try {
//         // Simuler un délai pour le chargement de ressources
//         await new Promise(resolve => setTimeout(resolve, 3000)); // 3 secondes
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppReady(true);
//       }
//     };

//     prepareApp();
//   }, []);

//   useEffect(() => {
//     // Cacher l'écran de démarrage d'Expo une fois que l'application est prête
//     if (isAppReady) {
//       SplashScreen.hideAsync();
//     }
//   }, [isAppReady]);

//   if (!isAppReady) {
//     // Votre écran de démarrage personnalisé
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Powered by [Nom]</Text>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     // Afficher le reste de votre application ici quand elle est prête
//     <View style={styles.appContainer}>
//       <Text style={styles.text}>L'application est prête!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   appContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });


// import { Image, StyleSheet, Platform } from "react-native";

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { Icon, MD3Colors,Button  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLinkTo } from '@react-navigation/native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { height, width } from "@/constants/Dimensions";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { StatusBar } from "expo-status-bar";
interface SplashScreenProps {
  message?: string;
}
const SplashScreen2: React.FC<SplashScreenProps> = ({ message }) => {
  const linkTo = useLinkTo();
  const h = height;
  const w = width
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.dark.background85} />
       <View style={{height: h*0.3, display:'flex', justifyContent:"flex-end"}}>
      <Image
        source={require("@/assets/images/logo-LARGE.png")} // Replace with your QR code image
        style={styles.qrIcon}
      />
      </View>
      
      <View style={{height: h*0.5, display:'flex', justifyContent:"flex-start", flexDirection:"column", paddingTop:'50%'}}>
      <View style={{height: 'auto', display:'flex', justifyContent:"flex-end"}}>
      <ActivityIndicator size="large" color="#fff" />
      </View>
      <View style={{height:"80%", display:'flex', justifyContent:"flex-end"  }}>
        <Text style={styles.description}>
        Powered by
        </Text>
        <Text style={styles.description}>
   GOCAS
        </Text>
        </View>
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
          
      </View>
    </View>
  );
}
export{SplashScreen2}
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
    fontSize: 12,
    color: Colors.dark.text,
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  description2: {
    fontSize: 18,
    color: Colors.dark.text,
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 0,
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
