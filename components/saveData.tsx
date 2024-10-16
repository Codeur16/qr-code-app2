import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const saveQRCodeData = async (imageUri: string, textData: string, operationType: string) => {
  try {
    // Vérifie si le dossier "QR code" existe dans la mémoire interne
    const directoryUri = `${FileSystem.documentDirectory}QR code/`;
    const directoryInfo = await FileSystem.getInfoAsync(directoryUri);
    
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
    }

    // Crée un sous-dossier selon le type d'opération
    const timestamp = new Date().getTime(); // Pour un nom unique basé sur le temps
    const subDirectoryUri = `${directoryUri}${operationType}_${timestamp}/`;
    const subDirectoryInfo = await FileSystem.getInfoAsync(subDirectoryUri);
    
    if (!subDirectoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(subDirectoryUri, { intermediates: true });
    }

    // Formate les données textuelles en JSON
    const jsonData = JSON.stringify({ data: textData }, null, 2); // Indentation pour une meilleure lisibilité
    const jsonFileName = `${operationType}Data.json`;
    const jsonUri = `${subDirectoryUri}${jsonFileName}`;
    
    // Sauvegarde le fichier JSON
    await FileSystem.writeAsStringAsync(jsonUri, jsonData, { encoding: FileSystem.EncodingType.UTF8 });

    // Sauvegarde l'image dans le sous-dossier
    const imageFileName = `QRCode_${operationType}.png`;
    const imageSaveUri = `${subDirectoryUri}${imageFileName}`;
    await FileSystem.moveAsync({ from: imageUri, to: imageSaveUri });

    // Enregistrer l'image dans la bibliothèque multimédia pour qu'elle apparaisse dans la galerie
    await MediaLibrary.createAssetAsync(imageSaveUri);

    Alert.alert('Succès', `Les données et l'image ont été sauvegardées dans ${subDirectoryUri}.`);
  } catch (error) {
    console.error(error);
    Alert.alert('Erreur', 'Une erreur est survenue lors de la sauvegarde.');
  }
};

export default saveQRCodeData;
