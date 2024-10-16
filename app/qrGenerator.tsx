import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { width } from "@/constants/Dimensions";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import QRCodeGenerator from "@/components/generate-qr-code";
type RootStackParamList = {
  QRCodeForm: { qrType: string };
};

type QRCodeFormScreenProps = {
  route: RouteProp<RootStackParamList, "QRCodeForm">;
};

export default function QRCodeFormScreen({ route }: QRCodeFormScreenProps) {
  const navigation = useNavigation();
  const { qrType } = useLocalSearchParams();
  const [formData, setFormData] = useState<any>({});
  const [qrData, setQrData] = useState<string | null>(null); // Stocke les données pour le QR Code


  useEffect(() => {
    navigation.setOptions({
      title: qrType, // Titre personnalisé en fonction du type QR
    });
  }, [navigation]);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerateQRCode = () => {
    console.log("QR Code généré avec les données : ", formData);
    const data = JSON.stringify(formData); // Convertir les données du formulaire en chaîne de caractères JSON
    setQrData(data); // Stocker les données du QR code
  };

  // Fonction pour sélectionner l'image en fonction du type de QR code
  const getIconForQRCodeType = () => {
    switch (qrType) {
      case "Texte":
        return require("@/assets/images/icon-text.png");
      case "Contact":
        return require("@/assets/images/contact-icon.png");  
      case "Email":
        return require("@/assets/images/email-icon.png");
      case "Wifi":
        return require("@/assets/images/wifi-icon.png");
      case "URL":
        return require("@/assets/images/web-icon.png");
      case "Localisation":
        return require("@/assets/images/location-icon.png");
      default:
        return require("@/assets/images/icon-large.png"); // Image par défaut si aucun type n'est reconnu
    }
  };

  const renderForm = () => {
    switch (qrType) {
      case "Texte":
        return (
          <View style={styles.form}>
            <Text style={styles.text}>Texte :</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrer un texte..."
              placeholderTextColor="#AAAAAA"
              selectionColor="#FFD700"
              onChangeText={(text) => handleChange("texte", text)}
            />
          </View>
        );
      case "Contact":
        return (
          <View style={styles.form}>
            <Text style={styles.text}>Entrez les informations de contact :</Text>
            {["Nom", "Prénom", "Numéro de téléphone", "Email", "Site Web", "Portfolio", "Localisation", "Numéro WhatsApp"].map((placeholder, index) => (
             <View style={styles.form2} key={index}>
             <Text style={styles.text}>{placeholder}:</Text>
             <TextInput
               style={styles.input}
               placeholderTextColor="#AAAAAA"
               selectionColor="#FFD700"
                 key={placeholder}
                placeholder={placeholder}
                onChangeText={(text) => handleChange(placeholder.toLowerCase(), text)}
             />
           </View>
             // <TextInput
              // placeholderTextColor="#AAAAAA"
              // selectionColor="#FFD700"
              //   key={placeholder}
              //   style={styles.input}
              //   placeholder={placeholder}
              //   onChangeText={(text) => handleChange(placeholder.toLowerCase(), text)}
              // />
            ))}
          </View>
        );
      case "Email":
        return (
          <View style={styles.form}>
            <Text style={styles.text}>Entrez l'adresse email :</Text>
            <TextInput
            placeholderTextColor="#AAAAAA"
              selectionColor="#FFD700"
              style={styles.input}
              placeholder="email@example.com"
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>
        );
      case "Wifi":
        return (
          <View style={styles.form}>
            <Text style={styles.text}>Entrez les informations Wi-Fi :</Text>
            <TextInput
            placeholderTextColor="#AAAAAA"
              selectionColor="#FFD700"
              style={styles.input}
              placeholder="Nom du réseau"
              onChangeText={(text) => handleChange("wifiNom", text)}
            />
            <TextInput
            placeholderTextColor="#AAAAAA"
              selectionColor="#FFD700"
              style={styles.input}
              placeholder="Mot de passe"
              onChangeText={(text) => handleChange("wifiPassword", text)}
              secureTextEntry={true}
            />
          </View>
        );
      case "URL":
        return (
          <View style={styles.form}>
            <Text style={styles.text}>Entrez l'URL :</Text>
            <TextInput
            placeholderTextColor="#AAAAAA"
              selectionColor="#FFD700"
              style={styles.input}
              placeholder="https://example.com"
              onChangeText={(text) => handleChange("url", text)}
            />
          </View>
        );
      case "Localisation":
        return (
          <View style={styles.form}>
            <Text style={styles.text}>Entrez les coordonnées de localisation :</Text>
            <TextInput
            placeholderTextColor="#AAAAAA"
              selectionColor="#FFD700"
              style={styles.input}
              placeholder="Latitude"
              onChangeText={(text) => handleChange("latitude", text)}
            />
            <TextInput
            placeholderTextColor="#AAAAAA"
              selectionColor="#FFD700"
              style={styles.input}
              placeholder="Longitude"
              onChangeText={(text) => handleChange("longitude", text)}
            />
          </View>
        );
      default:
        return <Text>Formulaire non disponible pour ce type de QR Code.</Text>;
    }
  };

  return (
  //   <KeyboardAvoidingView
  //   behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportement adapté pour iOS et Android
  //   style={styles.keyboardAvoidingContainer}
  // >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {/* Affiche l'image basée sur le type de QR */}
          <Image source={getIconForQRCodeType()} style={styles.icon} />
        </View>
        {renderForm()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
            <Text style={styles.buttonText}>Générer le QR Code</Text>
          </TouchableOpacity>
        </View>
        {qrData && <QRCodeGenerator data={qrData} />} 
      
      </View>
      
    </ScrollView>
  // </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
   keyboardAvoidingContainer: {
     flex: 1,
     //backgroundColor: Colors.dark.background85, 
   },
  scrollContainer: {
    minHeight:'100%',                                                                        
    height: "auto",
    width: width,
    paddingVertical: 70,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.dark.background85,
  
  },
  container: {
    padding: 16,
    backgroundColor: Colors.dark.background78,
    width: width * 0.85,
    minHeight: 300,
    borderRadius: 6,
    borderTopColor: Colors.light.background2,
    borderTopWidth: 2,
    borderBottomColor: Colors.light.background2,
    borderBottomWidth: 2,
    justifyContent: "space-around",
  },
  form: {
    marginBottom: 20,
  },
  form2: {
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1.5,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: Colors.dark.background80,
    color: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    color: Colors.dark.text,
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: Colors.light.background2,
    padding: 10,
    borderRadius: 6,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    height: 46,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark.background,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
// const styles = StyleSheet.create({
//   scrollContainer: {
//     height: "100%",
//     width: width,
//     paddingTop: 90,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     backgroundColor: Colors.dark.background85,
//   },
//   container: {
//     padding: 16,
//     backgroundColor: Colors.dark.background78,
//     width: width * 0.85,
//     minHeight: 300,
//     borderRadius: 6,
//     borderTopColor: Colors.light.background2,
//     borderTopWidth: 2,
//     borderBottomColor: Colors.light.background2,
//     borderBottomWidth: 2,
//     justifyContent: "space-around",
//   },
//   form: {
//     marginBottom: 20,
//   },
//   input: {
//     height: 45,
//     borderColor: "gray",
//     borderWidth: 1.5,
//     marginBottom: 10,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//     backgroundColor: Colors.dark.background80,
//     color: "#FFFFFF",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   text: {
//     color: Colors.dark.text,
//     fontSize: 16,
//     paddingVertical: 5,
//     fontWeight: "bold",
//   },
//   button: {
//     backgroundColor: Colors.light.background2,
//     padding: 10,
//     borderRadius: 6,
//     width: "70%",
//     justifyContent: "center",
//     alignItems: "center",
//     height: 46,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: Colors.dark.background,
//   },
//   iconContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     width: 50,
//     height: 50,
//   },
//   buttonContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
