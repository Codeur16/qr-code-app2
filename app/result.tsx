import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
  const { qrData, imageUri } = useLocalSearchParams(); // Récupérer les données scannées à partir de l'URL
  const [parsedData, setParsedData] = useState<any>(null); // État pour stocker les données analysées

  useEffect(() => {
    // Parser les données si qrData est une chaîne de caractères
    if (typeof qrData === "string") {
      try {
        const jsonData = JSON.parse(qrData); // Parser les données JSON
        setParsedData(jsonData); // Mettre à jour l'état avec les données analysées
      } catch (error) {
        console.error("Erreur de parsing des données QR:", error);
      }
    }
  }, [qrData]);

  // S'assurer que imageUri est de type string
  const imageSource = typeof imageUri === 'string' ? { uri: imageUri } : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultat du scan :</Text>

      {/* Affichage de l'image si imageSource est valide */}
      {imageSource && (
        <Image 
          source={imageSource} // Utilise l'URI de l'image
          style={styles.image} 
          resizeMode="contain" // Ajuste l'image à l'intérieur du conteneur
        />
      )}

      {parsedData ? (
        <ScrollView style={styles.dataContainer}>
          {Object.entries(parsedData).map(([key, value]) => (
            value ? ( // Vérifie si la valeur existe
              <Text key={key} style={styles.data}>
                <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}: </Text>
                {value.toString()}
              </Text>
            ) : null
          ))}
        </ScrollView>
      ) : (
        <View style={styles.container}>
        <Text style={styles.data}>{qrData}</Text>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  dataContainer: {
    marginTop: 20,
    width: '100%',
  },
  data: {
    fontSize: 18,
    color: 'green',
    marginVertical: 5, // Ajout d'espacement vertical entre les éléments
  },
  label: {
    fontWeight: 'bold', // Met le texte en gras pour les étiquettes
  },
  image: {
    width: '100%', // Ajuste la largeur de l'image
    height: 200,   // Hauteur fixe pour l'image
    marginBottom: 20, // Espacement en bas de l'image
  },
});
