import React, { useRef, useState } from "react";
import { View, Button, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { captureRef } from "react-native-view-shot";
import { Colors } from "@/constants/Colors";
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';








export default function QRCodeGenerator({ data }: { data: string }) {
  const viewShotRef = useRef(null);
  const [hasPermissions, setHasPermissions] = useState(false);
  const qrRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

 
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
      // await saveQRCodeData( localUri, data, "generation");
    } catch (e) {
      console.log(e);
    }
  };
 // Fonction pour capturer et enregistrer l'image
 const onShareImageAsync = async () => {
  try {
    const localUri = await captureRef(imageRef, {
      height: 440,
      quality: 1,
    });

    // // Enregistrer dans la galerie
    await MediaLibrary.saveToLibraryAsync(localUri);
    Alert.alert('Succès', 'Image sauvegardée dans la galerie!');

    // Partager l'image si possible
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(localUri);
    } else {
      Alert.alert('Erreur', 'Partage non disponible sur cet appareil.');
    }
  } catch (e) {
    console.log(e);
    Alert.alert('Erreur', 'Une erreur est survenue lors de la sauvegarde.');
  }
};
  return (
    <View style={styles.qrZone}>
      <View ref={imageRef} collapsable={false} style={styles.qrBox}>
        <QRCode value={data} size={100} getRef={(c) => (qrRef.current = c)} />
      </View>
      <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableOpacity style={styles.buttomBox} onPress={onShareImageAsync} ><Image source={require("@/assets/images/share-icon.png")} style={styles.icon} /></TouchableOpacity>
        <TouchableOpacity style={styles.buttomBox} onPress={onSaveImageAsync} ><Image source={require("@/assets/images/save-icon.png")} style={styles.icon} /></TouchableOpacity>
        {/* <Button title="Enregistrer le QR Code" onPress={onSaveImageAsync} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  qrZone: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  qr: {
    resizeMode: "contain",
    width: 150,
    height: 150,
  },
  qrBox: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.light.background2,
    borderWidth: 3,
    marginVertical:10
  },
  buttomBox:{
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: Colors.light.background2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:10

  },
  icon:{
    width:30,
    height:30,
    resizeMode:'contain'
  }
});






