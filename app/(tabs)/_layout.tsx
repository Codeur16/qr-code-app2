import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon, MD3Colors } from 'react-native-paper';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background2,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle, // Custom floating Tab Bar style
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // title: "Générer",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "qr-code" : "qr-code-outline"}
              color={color}
            />
          ),
          // tabBarLabelStyle: {
          //   borderBottomWidth: 2, // Add a bottom border
          //    borderBottomColor: Colors.light.background2, // Yellow color for the border
          //   paddingBottom: 5, // Add padding to the bottom
          //   fontSize: 14, // Adjust the font size
          //   fontWeight: "bold", // Padding below the text
          //   letterSpacing: 1,
          // },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: focused ? Colors.light.background2 : "gray",
                paddingBottom: 5,
                letterSpacing: 1,
                borderBottomWidth: focused ? 2 : 0, // Add a bottom border when focused
                borderBottomColor: focused ? Colors.light.background2 : "gray", // Yellow border color
              }}
            >
              Générer
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.scannerButton}>
              <Image
                source={require("@/assets/images/logo2.png")} // Replace with your QR code image
                style={styles.qrIcon}
              />
              {/* <TabBarIcon
                name={focused ? "qr-code" : "qr-code-outline"}
                color={color}
              /> */}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="historique"
        options={{
          // title: 'Historique',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.simpleButton}>
              <TabBarIcon
                name={focused ? "time" : "time-outline"}
                color={color}
              />
              {/* <Text>Historique</Text> */}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: focused ? Colors.light.background2 : "gray",
                paddingBottom: 5,
                letterSpacing: 1,
                borderBottomWidth: focused ? 2 : 0, // Add a bottom border when focused
                borderBottomColor: focused ? Colors.light.background2 : "gray", // Yellow border color
              }}
            >
              Historique
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

// Styles
const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    height: 70,
    backgroundColor: Colors.dark.background,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 8,
    borderTopWidth: 2, // Ajoute une bordure supérieure
    borderTopColor: Colors.light.background2, // Bordure supérieure jaune
  },
  scannerButton: {
    width: 70,
    height: 70,
    backgroundColor: Colors.light.background2, // Couleur de fond jaune
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30, // Relevé plus haut que les autres icônes
    shadowColor: Colors.light.background2,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 100,
    elevation: 5,
  },
  simpleButton: {},
  qrIcon: {
    width: 40,
    height: 40,
    marginBottom: 0,
  },
});
