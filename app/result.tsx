import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Image,
  Linking,
  Share,
  Clipboard, // Import the Clipboard module
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { IconButton } from "react-native-paper"; // Importation de IconButton
import { saveDataToDB } from "@/components/stockage";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";

const db = SQLite.openDatabaseSync("qr_codes.db");

type RootStackParamList = {
  QRCodeForm: { qrType: string };
};

type QRCodeFormScreenProps = {
  route: RouteProp<RootStackParamList, "QRCodeForm"> & {
    params: { qrData: string; imageUri: string };
  };
};

export default function QRCodeFormScreen({ route }: QRCodeFormScreenProps) {
  const navigation = useNavigation();
  const { qrData, imageUri } = useLocalSearchParams(); // Récupération des paramètres
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    console.log("Données QR :", qrData);
    console.log("Image URI reçue :", imageUri);
  }, [qrData, imageUri]);

  const copyToClipboard = () => {
    if (qrData) {
      Clipboard.setString(qrData.toString());
      ToastAndroid.show("Copié dans le presse-papier", ToastAndroid.SHORT);
    }
  };

  const shareData = async () => {
    try {
      await Share.share({
        message: qrData ? qrData.toString() : "",
      });
    } catch (error) {
      ToastAndroid.show(
        "Impossible de partager les informations",
        ToastAndroid.SHORT
      );
    }
  };

  const searchOnWeb = () => {
    if (qrData) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(Array.isArray(qrData) ? qrData.join("") : qrData)}`;
      Linking.openURL(searchUrl);
    }
  };

  const deleteData = () => {
    navigation.goBack();
    ToastAndroid.show("Données supprimées", ToastAndroid.SHORT);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Informations du QR Code</Text>
        {qrData && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{qrData}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <IconButton
            icon="clipboard"
            size={30}
            onPress={copyToClipboard}
            style={styles.iconButton}
            iconColor="#fff"
          />
          <IconButton
            icon="share"
            size={30}
            onPress={shareData}
            style={styles.iconButton}
            iconColor="#fff"
          />
          <IconButton
            icon="magnify"
            size={30}
            onPress={searchOnWeb}
            style={styles.iconButton}
            iconColor="#fff"
          />
          <IconButton
            icon="trash-can"
            size={30}
            onPress={deleteData}
            style={styles.iconButton}
            iconColor="#fff"
          />
          <IconButton
            icon="content-save"
            size={30}
            onPress={async () => {
              qrData
                ? await saveDataToDB(
                    Array.isArray(qrData) ? qrData.join("") : qrData,
                    "generate"
                  )
                : ToastAndroid.show(
                    "Veuillez réessayer!",
                    ToastAndroid.SHORT
                  );
            }}
            style={styles.iconButton}
            iconColor="#fff"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    display: "flex",
    flex: 1,
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: Colors.dark.background85,
  },
  container: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row", // Disposition horizontale
    justifyContent: "space-around", // Espace égal entre les icônes
    width: "100%",
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: Colors.light.background2, // Couleur de fond
    color: "#fff",
  },
});
