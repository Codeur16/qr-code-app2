import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, ScrollView , Text,View } from 'react-native';
import { height, width } from '@/constants/Dimensions';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export default function HistScreen() {
  return (
    <ScrollView contentContainerStyle={{height:'100%', width:width, paddingTop:90, justifyContent:'flex-start' , alignItems:"center", backgroundColor: Colors.dark.background85 }}>
    <View style={{width:"100%", padding:5}}>
   <ThemedText type='title' style={{color:"#D9D9D9"}}>Historique</ThemedText>
   </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
