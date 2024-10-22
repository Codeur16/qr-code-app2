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
  ToastAndroid
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { RouteProp } from "@react-navigation/native";
import { width } from "@/constants/Dimensions";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import QRCodeGenerator from "@/components/generate-qr-code";
type RootStackParamList = {
  QRCodeForm : { qrType : string };
};

type QRCodeFormScreenProps = {
  route : RouteProp<RootStackParamList, "QRCodeForm">;
};

export default function QRCodeFormScreen({ route } : QRCodeFormScreenProps) {
  const navigation = useNavigation();
  const { qrType } = useLocalSearchParams();
  const [formData, setFormData] = useState<any>({});
  const [qrData, setQrData] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({
      title : qrType,
    });
  }, [navigation]);

  const handleChange = (name : string, value : string) => {
    setFormData({ ...formData, [name] : value });
  };
// Function to format formData based on qrType
const formatFormData = (data : any, qrType : string) => {
  switch (qrType) {
    case "Texte" :
      return "Texte : \n"+data.texte ? `Texte : ${data.texte}`  : '';

    case "Contact" :
      return (
        ("Contact : \n")+
        (" \n")+
        (data.nom ? `Nom :\t ${data.nom} \n`  : '') +
        (data.prénom ? `Prénom : ${data.prénom} \n`  : '') +
        (data["numéro de téléphone"] ? `Numéro de téléphone : ${data["numéro de téléphone"]} \n`  : '') +
        (data.email ? `Email : ${data.email} \n`  : '') +
        (data["site web"] ? `Site web : ${data["site web"]} \n`  : '') +
        (data.portfolio ? `Portfolio : ${data.portfolio} \n`  : '') +
        (data.localisation ? `Localisation : ${data.localisation} \n`  : '') +
        (data["numéro whatsapp"] ? `Numéro WhatsApp : ${data["numéro whatsapp"]} \n`  : '')
      );

    case "Email" :
      return "Email : \n"+data.email ? `mailto :${data.email}`  : '';

    case "Wifi" :
      return (
        ("Wifi : \n")+
        (data.wifiNom ? `WIFI :S :${data.wifiNom};`  : '') +
        (data.wifiPassword ? `P :${data.wifiPassword};`  : '') + 
        "T :WPA;;"
      );

    case "URL" :
      return ("URL : \n")+data.url ? `URL : ${data.url}`  : '';

    case "Localisation" :
      return (
        ("Localisation : \n")+
        (data.latitude ? `Latitude : ${data.latitude} \n`  : '') +
        (data.longitude ? `Longitude : ${data.longitude} \n`  : '')
      );
      case "wifi" :
  return (
    ("Wifi : \n") +
    (data.wifiNom ? `WIFI :S :${data.wifiNom};`  : '') +  // Nom du réseau
    (data.wifiPassword ? `P :${data.wifiPassword};`  : '') +  // Mot de passe
    "T :WPA;;"  // Type de sécurité par défaut (WPA)
  );

    default :
      return 'Format non supporté pour ce type de QR code';
  }
};

// Usage in handleGenerateQRCode
// const handleGenerateQRCode = () => {
//   const formattedData = formatFormData(formData, qrType.toString()); // Convert qrType to string before passing it to formatFormData
//   console.log("QR Code généré avec les données  : ", formattedData);
//   setQrData(formattedData); // Store the formatted data for the QR code
// };

const hasNonEmptyField = (data: Record<string, any>): boolean => {
  return Object.values(data).some(value => value && value.trim() !== '');
};
const handleGenerateQRCode = () => {
  if (!hasNonEmptyField(formData)) {
    ToastAndroid.show("Veuillez remplir au moins un champ.", ToastAndroid.SHORT);
    return; // Arrêtez la fonction si aucun champ n'est rempli
  }

  const formattedData = formatFormData(formData, qrType.toString());
  console.log("QR Code généré avec les données :", formattedData);
  setQrData(formattedData); // Stocke les données formatées pour le QR code
};
  const getIconForQRCodeType = () => {
    switch (qrType) {
      case "Texte" :
        return require("@/assets/images/icon-text.png");
      case "Contact" :  
        return require("@/assets/images/contact-icon.png");
      case "Email" :
        return require("@/assets/images/email-icon.png");
      case "wifi" :
        return require("@/assets/images/wifi-icon.png");
      case "URL" :
        return require("@/assets/images/web-icon.png");
      case "Localisation" :
        return require("@/assets/images/location-icon.png");
      default :
        return require("@/assets/images/icon-large.png");
    }
  };

  const renderForm = () => {
    switch (qrType) {
      case "Texte" :
        return (
          <View style={styles.form}>
            <Text style={styles.text}>Texte  :</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrer un texte..."
              placeholderTextColor="#AAAAAA"
              selectionColor="#FFD700"
              onChangeText={(text) => handleChange("texte", text)}
            />
          </View>
        );
      case "Contact" :
        return (
          <View style={styles.form}>
            <Text style={styles.text}>Entrez les informations de contact  :</Text>
            {["Nom", "Prénom", "Numéro de téléphone", "Email", "Site Web", "Portfolio", "Localisation", "Numéro WhatsApp"].map((placeholder, index) => (
              <View style={styles.form2} key={index}>
                <Text style={styles.text}>{placeholder} :</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#AAAAAA"
                  selectionColor="#FFD700"
                  placeholder={placeholder}
                  onChangeText={(text) => handleChange(placeholder.toLowerCase(), text)}
                />
              </View>
            ))}
          </View>
        );
        case "Email" :
          return (
            <View style={styles.form}>
              <Text style={styles.text}>Entrez l'adresse email  :</Text>
              <TextInput
              placeholderTextColor="#AAAAAA"
                selectionColor="#FFD700"
                style={styles.input}
                placeholder="email@example.com"
                onChangeText={(text) => handleChange("email", text)}
              />
            </View>
          );
          case "wifi" :
            return (
              <View style={styles.form}>
                <Text style={styles.text}>Entrez les informations Wi-Fi  :</Text>
                <TextInput
                  placeholderTextColor="#AAAAAA"
                  selectionColor="#FFD700"
                  style={styles.input}
                  placeholder="Nom du réseau (SSID)"
                  onChangeText={(text) => handleChange("wifiNom", text)}
                />
                <TextInput
                  placeholderTextColor="#AAAAAA"
                  selectionColor="#FFD700"
                  style={styles.input}
                  placeholder="Mot de passe Wi-Fi"
                  onChangeText={(text) => handleChange("wifiPassword", text)}
                  secureTextEntry={true}
                />
              </View>
            );
        case "URL" :
          return (
            <View style={styles.form}>
              <Text style={styles.text}>Entrez l'URL  :</Text>
              <TextInput
              placeholderTextColor="#AAAAAA"
                selectionColor="#FFD700"
                style={styles.input}
                placeholder="https ://example.com"
                onChangeText={(text) => handleChange("url", text)}
              />
            </View>
          );
        case "Localisation" :
          return (
            <View style={styles.form}>
              <Text style={styles.text}>Entrez les coordonnées de localisation  :</Text>
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
          
      default :
        return <Text>Formulaire non disponible pour ce type de QR Code.</Text>;
    
    };
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
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
  );
}



const styles = StyleSheet.create({
   keyboardAvoidingContainer : {
     flex : 1,
     //backgroundColor : Colors.dark.background85, 
   },
  scrollContainer : {
    minHeight :'100%',                                                                        
    height : "auto",
    width : width,
    paddingVertical : 70,
    justifyContent : "flex-start",
    alignItems : "center",
    backgroundColor : Colors.dark.background85,
  
  },
  container : {
    padding : 16,
    backgroundColor : Colors.dark.background78,
    width : width * 0.85,
    minHeight : 300,
    borderRadius : 6,
    borderTopColor : Colors.light.background2,
    borderTopWidth : 2,
    borderBottomColor : Colors.light.background2,
    borderBottomWidth : 2,
    justifyContent : "space-around",
  },
  form : {
    marginBottom : 20,
  },
  form2 : {
    marginBottom : 5,
  },
  input : {
    height : 45,
    borderColor : "gray",
    borderWidth : 1.5,
    marginBottom : 10,
    paddingHorizontal : 8,
    borderRadius : 5,
    backgroundColor : Colors.dark.background80,
    color : "#FFFFFF",
    shadowColor : "#000",
    shadowOffset : { width : 0, height : 2 },
    shadowOpacity : 0.8,
    shadowRadius : 3,
    elevation : 5,
  },
  text : {
    color : Colors.dark.text,
    fontSize : 16,
    paddingVertical : 5,
    fontWeight : "bold",
  },
  button : {
    backgroundColor : Colors.light.background2,
    padding : 10,
    borderRadius : 6,
    width : "70%",
    justifyContent : "center",
    alignItems : "center",
    height : 46,
    shadowColor : "#000",
    shadowOffset : { width : 0, height : 2 },
    shadowOpacity : 0.8,
    shadowRadius : 3,
    elevation : 5,
  },
  buttonText : {
    fontSize : 16,
    fontWeight : "bold",
    color : Colors.dark.background,
  },
  iconContainer : {
    justifyContent : "center",
    alignItems : "center",
  },
  icon : {
    width : 50,
    height : 50,
    resizeMode:'contain'
  },
  buttonContainer : {
    justifyContent : "center",
    alignItems : "center",
  },
});
// const styles = StyleSheet.create({
//   scrollContainer : {
//     height : "100%",
//     width : width,
//     paddingTop : 90,
//     justifyContent : "flex-start",
//     alignItems : "center",
//     backgroundColor : Colors.dark.background85,
//   },
//   container : {
//     padding : 16,
//     backgroundColor : Colors.dark.background78,
//     width : width * 0.85,
//     minHeight : 300,
//     borderRadius : 6,
//     borderTopColor : Colors.light.background2,
//     borderTopWidth : 2,
//     borderBottomColor : Colors.light.background2,
//     borderBottomWidth : 2,
//     justifyContent : "space-around",
//   },
//   form : {
//     marginBottom : 20,
//   },
//   input : {
//     height : 45,
//     borderColor : "gray",
//     borderWidth : 1.5,
//     marginBottom : 10,
//     paddingHorizontal : 8,
//     borderRadius : 5,
//     backgroundColor : Colors.dark.background80,
//     color : "#FFFFFF",
//     shadowColor : "#000",
//     shadowOffset : { width : 0, height : 2 },
//     shadowOpacity : 0.8,
//     shadowRadius : 3,
//     elevation : 5,
//   },
//   text : {
//     color : Colors.dark.text,
//     fontSize : 16,
//     paddingVertical : 5,
//     fontWeight : "bold",
//   },
//   button : {
//     backgroundColor : Colors.light.background2,
//     padding : 10,
//     borderRadius : 6,
//     width : "70%",
//     justifyContent : "center",
//     alignItems : "center",
//     height : 46,
//     shadowColor : "#000",
//     shadowOffset : { width : 0, height : 2 },
//     shadowOpacity : 0.8,
//     shadowRadius : 3,
//     elevation : 5,
//   },
//   buttonText : {
//     fontSize : 16,
//     fontWeight : "bold",
//     color : Colors.dark.background,
//   },
//   iconContainer : {
//     justifyContent : "center",
//     alignItems : "center",
//   },
//   icon : {
//     width : 50,
//     height : 50,
//   },
//   buttonContainer : {
//     justifyContent : "center",
//     alignItems : "center",
//   },
// });
