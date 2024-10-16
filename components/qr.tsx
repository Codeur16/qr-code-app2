import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CreateDirectoryExample = () => {
  const createDirectory = async () => {
    try {
      // Spécifie le chemin du nouveau dossier
      const directoryUri = `${FileSystem.documentDirectory}QRCODE/`;

      // Vérifie si le dossier existe déjà
      const directoryInfo = await FileSystem.getInfoAsync(directoryUri);

      if (!directoryInfo.exists) {
        // Crée le dossier
        await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
        Alert.alert('Succès', `Le dossier "${directoryUri}" a été créé.`);
        console.log('Succès', `Le dossier "${directoryUri}" a été créé.`)
      } else {
        Alert.alert('Info', `Le dossier "${directoryUri}" existe déjà.`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la création du dossier.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Créer un Dossier dans le Stockage de l'Appareil</Text>
      <Button title="Créer Dossier" onPress={createDirectory} />
    </View>
  );
};

export default CreateDirectoryExample;
