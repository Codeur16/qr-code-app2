import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  View,
  Pressable
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { height, width } from "@/constants/Dimensions";
import { Icon, MD3Colors } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
export default function HomeScreen() {
  const linkTo = useLinkTo();

  const handlePress = (qrType: string) => {
    // Naviguer avec un paramètre qrType
    linkTo(`/qrGenerator?qrType=${qrType}`);
  };

  // Tableau des éléments avec leur label et leur action spécifique
  const items = [
    {
      title: "Texte",
      icon: require("@/assets/images/icon-text.png"),
      onPress: () => handlePress("Texte"),
    },
    {
      title: "Contact",
      icon: require("@/assets/images/contact-icon.png"),
      onPress: () => handlePress("Contact"),
    },
    {
      title: "URL",
      icon: require("@/assets/images/web-icon.png"),
      onPress: () => handlePress("URL"),
    },
    {
      title: "Email",
      icon: require("@/assets/images/email-icon.png"),
      onPress: () => handlePress("Email"),
    },
    {
      title: "Wifi",
      icon: require("@/assets/images/wifi-icon.png"),
      onPress: () => handlePress("wifi"),
    },
    {
      title: "Localisation",
      icon: require("@/assets/images/location-icon.png"),
      onPress: () => handlePress("Localisation"),
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
        width: width,
        paddingTop: 90,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.dark.background85,
      }}
    >
      <View style={{ width: "100%", height: "10%", padding: 5 }}>
        <ThemedText type="title" style={{ color: "#D9D9D9" }}>
          Générer un QR
        </ThemedText>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: 3,
          marginTop: 0,
          height: "90%",
        }}
      >
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onPress} // Action spécifique à chaque élément
            style={({ pressed }) => [
              styles.box,
              pressed ? styles.boxPressed : null
            ]}
          >
            <Image
              source={item.icon} // Icone spécifique à chaque élément
              style={styles.reactIcon}
            />
            <Text style={styles.textIcon}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  box: {
    width: "25%",
    height: 100,
    marginBottom: 25,
    backgroundColor: Colors.dark.background82,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 1,
    padding: 5,
  },
  boxPressed: {
    backgroundColor: Colors.dark.background87, // Couleur lors de l'appui
    transform: [{ scale: 0.95 }], // Réduction de l'échelle
  },
  reactIcon: {
    width: 40,
    height: 40,
    marginBottom: 0,
    resizeMode: 'contain',
  },
  textIcon: {
    color: Colors.light.background2,
    marginTop: 5,
  },
});
