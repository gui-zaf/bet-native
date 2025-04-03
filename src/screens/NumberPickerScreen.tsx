import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import { NumberSelector } from '@/components/NumberSelector';

type NumberPickerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NumberPicker'>;

export function NumberPickerScreen() {
  const navigation = useNavigation<NumberPickerScreenNavigationProp>();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Prevent back navigation
    });

    return () => backHandler.remove();
  }, []);

  const handleNumberPress = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, number].sort((a, b) => a - b));
    }
  };

  const handleProceed = () => {
    // Generate 6 random numbers between 1 and 60
    const drawnNumbers = new Set<number>();
    while (drawnNumbers.size < 6) {
      drawnNumbers.add(Math.floor(Math.random() * 60) + 1);
    }
    const sortedDrawnNumbers = Array.from(drawnNumbers).sort((a, b) => a - b);
    
    navigation.replace('Results', {
      selectedNumbers,
      drawnNumbers: sortedDrawnNumbers,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../../assets/picker-banner.png')} style={styles.banner} />
        <View style={styles.message}>
          <Text style={styles.title}>Escolha 6 números</Text>
          <Text style={styles.subTitle}>
            Sabia que é mais fácil você ser atingido por um raio do que ganhar nosso jogo?
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.numbersContainer}>
          {Array.from({ length: 60 }, (_, i) => i + 1).map((number) => (
            <NumberSelector
              key={number}
              number={number}
              isSelected={selectedNumbers.includes(number)}
              onPress={() => handleNumberPress(number)}
            />
          ))}
        </ScrollView>
        {selectedNumbers.length === 6 && (
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.proceedButtonText}>Prosseguir</Text>
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
    gap: 20,
  },
  title: {
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
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  proceedButton: {
    backgroundColor: '#65C56C',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 