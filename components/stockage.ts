import * as SQLite from 'expo-sqlite';
import {
  ToastAndroid,
  Image, // Add this import statement
} from "react-native";
export  const initDB = async () => {
  const db = await SQLite.openDatabaseAsync('DB.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS DB (
      id INTEGER PRIMARY KEY NOT NULL, 
      qr_text TEXT NOT NULL, 
      type TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `);
  
  console.log("Base de données initialisée et table créée.");
};



const storeQRCode = async (qrText: string , type: string) => {
    const db = await SQLite.openDatabaseAsync('DB.db');
    const date = new Date().toISOString(); // Enregistre la date actuelle
  
    await db.runAsync(
      'INSERT INTO DB (qr_text, type) VALUES (?, ?)', 
      [qrText, type]
    );
    ToastAndroid.show("Sauvegardées.", ToastAndroid.SHORT);
  };

  export const saveDataToDB = async (qr_text: string , type: string) => {
    if (!qr_text) {
      ToastAndroid.show("Données inalides", ToastAndroid.SHORT);
      console.error("Invalid data provided");
      return;
    }
    const db = await SQLite.openDatabaseAsync('DB.db'); // Declare the 'db' variable
    try {
      // Exécute la requête d'insertion dans la base de données SQLite
      await db.runAsync(
        'INSERT INTO DB (qr_text, type, date) VALUES (?, ?, ?)',
        [qr_text, type, new Date().toISOString()]
      );
      ToastAndroid.show("Sauvegardées.", ToastAndroid.SHORT);
      
    } catch (error) {
      ToastAndroid.show("Impossible de sauvegarder.", ToastAndroid.SHORT);
      console.error("Erreur SQLite:", error);
    }
  };

  
  export const getQRCodeHistory = async () => {
    const db = await SQLite.openDatabaseAsync('DB.db');
    
    const allRows = await db.getAllAsync('SELECT * FROM DB ORDER BY date DESC');
    return allRows;
  };
    
