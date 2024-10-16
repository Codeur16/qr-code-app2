import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { height, width } from "@/constants/Dimensions";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
  Camera,
} from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { useLinkTo } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"; // Importer l'image picker
import { BarCodeScanner } from "expo-barcode-scanner";
import { Icon, MD3Colors } from "react-native-paper";
export default function TabTwoScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const linkTo = useLinkTo();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  function handleBarcodeScanned({ type, data }: any): void {
    setScanned(true);

    // Redirection vers l'écran des résultats avec les données scannées
    linkTo(`/result?qrData=${encodeURIComponent(data)}`);
  }

  // Fonction pour importer une image et scanner le QR code

  const pickImageAndScan = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);

      // Scanner le code-barres depuis l'image
      if (selectedImage) {
        const scanResult = await BarCodeScanner.scanFromURLAsync(selectedImage);
      } else {
        // Handle the case when selectedImage is undefined
        // For example, show an error message or take appropriate action
        return;
      }

      const scanResult = await BarCodeScanner.scanFromURLAsync(selectedImage);

      if (scanResult.length > 0) {
        const { data } = scanResult[0];
        linkTo(`/result?qrData=${encodeURIComponent(data)}&imageUri=${encodeURIComponent(selectedImage)}`);
      } else {
        Alert.alert("No QR code found in the image");
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
      <View style={{ width: "100%", padding: 5, flexDirection: "row", justifyContent:'space-between' , alignItems:'center'}}>
        <ThemedText type="title" style={{ color: "#D9D9D9" }}>
          Scanner un QR code
        </ThemedText>
        <TouchableOpacity
                   onPress={pickImageAndScan} // Action de retour
                    style={{ paddingLeft: 10, paddingRight:10 , justifyContent:'center', alignItems:'center'}}
                  >
                    <Icon source="image" color={Colors.light.background2} size={30} />
                    <Text style={{color:"#fff" }}>Galerie</Text>
                  </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView> */}
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Pressable
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.dark.background80,
            }}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.text}> Cliquer pour réessayer</Text>
          </Pressable>
        )}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImageAndScan}>
            <Text style={styles.text}>Importer une image</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    height: "80%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    height: "20%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.dark.background78,
    margin: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
