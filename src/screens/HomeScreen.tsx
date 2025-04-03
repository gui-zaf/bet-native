import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image source={require('../../assets/home-banner.png')} style={styles.banner} />
        <View style={styles.message}>
          <Text style={styles.homeTitle}>Fique milionário com a Mega-Sena</Text>
          <Text style={styles.subTitle}>Sua chance de mudar de vida começa aqui. Acesse e faça sua aposta</Text>
        </View>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('NumberPicker')}
        >
          <Text style={styles.startButtonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    gap: 30,
    backgroundColor: '#fff',
    padding: 20,
  },
  banner: {
    width: '100%', 
    height: 222,
    resizeMode: 'contain',
  },
  message: {
    width: '100%',
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#272729',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: '#5B5B5E',
    textAlign: 'center',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#65C56C',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 