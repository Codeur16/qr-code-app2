import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg"; // Import QRCode from react-native-qrcode-svg
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getQRCodeHistory } from "@/components/stockage";
import { useEffect, useState } from "react";

interface QRCodeHistoryRow {
  qr_text: string;
  id: number;
  type: string;
  date: string;
}

export default function HistScreen() {
  const [history, setHistory] = useState<QRCodeHistoryRow[]>([]);



  const fetchHistory = async () => {
    try {
      const rows: unknown[] = await getQRCodeHistory();

      // Map rows to the correct format and set the state
      const qrCodeData = (rows as QRCodeHistoryRow[]).map((row) => ({
        id: row.id,
        type: row.type,
        date: row.date,
        qr_text: row.qr_text,
      }));

      setHistory(qrCodeData);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique:", error);
    }
  };
  useEffect(() => {
    fetchHistory();
  });
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.dark.background85,
        paddingTop: 90,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ width: "100%", padding: 5 }}>
        <ThemedText type="title" style={{ color: "#D9D9D9" }}>
          Historique
        </ThemedText>
      </View>

      {history.length === 0 ? (
        <View style={{ marginTop: 20 }}>
          <ThemedText style={{ color: "#D9D9D9" }}>
            Aucun historique de QR code disponible.
          </ThemedText>
        </View>
      ) : (
        history.map((qrCode) => (
          <View key={qrCode.id} style={styles.qrCodeItem}>
            <View style={styles.qrCodeTextContainer}>
              <Text style={styles.qrCodeText}>
                Type: {qrCode.type} - Date: {qrCode.date}
              </Text>
              <Text style={styles.qrCodeText}>Données: {qrCode.qr_text}</Text>
            </View>
            <View  style={styles.qrCode} >
              <QRCode
                value={qrCode.qr_text}
                size={40}
                backgroundColor="white"
                color="black"
               
              />
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  qrCodeItem: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between", // Create space between text and QR code
    alignItems: "center", // Center items vertically
  },
  qrCodeTextContainer: {
    flex: 1,
  },
  qrCodeText: {
    color: "#D9D9D9",
    fontSize: 14,
    marginBottom: 5,
  },
  qrCode: {
   
   
    justifyContent:'center',
    alignItems:'center',
    
  },
});
