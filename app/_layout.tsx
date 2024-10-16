// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";
// import "react-native-reanimated";
// import { PaperProvider } from "react-native-paper";
// import { useColorScheme } from "@/hooks/useColorScheme";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <PaperProvider>
//       <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//         <Stack>
//           <Stack.Screen name="index" options={{ headerShown: false }} />
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack>
//       </ThemeProvider>
//     </PaperProvider>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SplashScreen2 } from "@/components/splashScreen";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { useLinkTo } from "@react-navigation/native";
import { Icon, MD3Colors } from "react-native-paper";
// Empêcher l'écran de démarrage de se masquer automatiquement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const linkTo = useLinkTo();
  const colorScheme = useColorScheme();
  const [isAppReady, setAppReady] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Valeur d'animation
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Simuler un délai pour le chargement de ressources
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 secondes
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      // Animer la transition
      Animated.timing(fadeAnim, {
        toValue: 1, // Valeur finale
        duration: 1000, // Durée de l'animation en ms
        useNativeDriver: true, // Utiliser le driver natif pour de meilleures performances
      }).start(() => {
        SplashScreen.hideAsync(); // Masquer le splash screen d'Expo après l'animation
      });
    }
  }, [isAppReady, fadeAnim]);

  // Si l'application n'est pas encore prête, afficher le splash screen personnalisé
  if (!isAppReady) {
    return <SplashScreen2 />;
  }

  // Si les polices ne sont pas encore chargées, ne rien afficher
  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* Status bar configuration */}
        <StatusBar style="light" backgroundColor={Colors.dark.background85} />

        {/* Utilisation de SafeAreaView pour protéger la StatusBar */}
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            {/* QRCodeFormScreen pour les formulaires spécifiques */}
            <Stack.Screen
              name="qrGenerator"
              options={{
                headerShown: true, // Show the header
                title: "QR", // Custom title for the header
                headerStyle: {
                  backgroundColor: Colors.dark.background, // Change the background color of the header
                },
                headerTintColor: "#fff", // Change the text/icon color
                headerTitleStyle: {
                  fontWeight: "bold", // Style the title text
                },
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => linkTo("/(tabs)")} // Action de retour
                    style={{ paddingLeft: 10, paddingRight:10 }}
                  >
                    <Icon source="arrow-left" color={"#FFFFFF"} size={20} />
                  </TouchableOpacity>
                ), // Bouton personnalisé à gauche
              }}
            />
             <Stack.Screen name="result"  options={{
                headerShown: true, // Show the header
                title: "Résultat", // Custom title for the header
                headerStyle: {
                  backgroundColor: Colors.dark.background, // Change the background color of the header
                },
                headerTintColor: "#fff", // Change the text/icon color
                headerTitleStyle: {
                  fontWeight: "bold", // Style the title text
                },
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => linkTo("/(tabs)")} // Action de retour
                    style={{ paddingLeft: 10, paddingRight:10 }}
                  >
                    <Icon source="arrow-left" color={"#FFFFFF"} size={20} />
                  </TouchableOpacity>
                ), // Bouton personnalisé à gauche
              }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
      </ThemeProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
