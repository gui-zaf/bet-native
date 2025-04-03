import { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import { NumberSelector } from '@/components/NumberSelector';

type ResultsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

export function ResultsScreen() {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const route = useRoute<ResultsScreenRouteProp>();
  const { selectedNumbers, drawnNumbers } = route.params;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const correctNumbers = selectedNumbers.filter(num => drawnNumbers.includes(num));
  const isWinner = correctNumbers.length === 6;

  const getResultMessage = () => {
    switch (correctNumbers.length) {
      case 6:
        return 'Você fez uma Sena!';
      case 5:
        return 'Você fez uma Quina!';
      case 4:
        return 'Você fez uma Quadra!';
      default:
        return 'Como mencionado anteriormente';
    }
  };

  const getSubtitleMessage = () => {
    if (isWinner) {
      return 'você acertou todos os números';
    }

    switch (correctNumbers.length) {
      case 0:
        return 'Você errou todos os números, mas calma… Sua chance de ser atingido por um raio ainda é maior.';
      case 1:
        return 'Você acertou 1 número, mas calma… Sua chance de ser atingido por um raio ainda é maior.';
      default:
        return `Você acertou ${correctNumbers.length} números, mas calma… Sua chance de ser atingido por um raio ainda é maior.`;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image 
          source={isWinner 
            ? require('../../assets/success-banner.png')
            : require('../../assets/fail-banner.png')
          } 
          style={styles.banner} 
        />
        <View style={styles.message}>
          <Text style={styles.title}>
            {getResultMessage()}
          </Text>
          <Text style={styles.subTitle}>
            {getSubtitleMessage()}
          </Text>
        </View>
        <View style={styles.numbersContainer}>
          <View style={styles.numbersSection}>
            <Text style={styles.sectionTitle}>Números sorteados</Text>
            <View style={styles.numbersRow}>
              {drawnNumbers.map((number) => (
                <NumberSelector
                  key={number}
                  number={number}
                  isSelected={true}
                />
              ))}
            </View>
          </View>
          <View style={styles.numbersSection}>
            <Text style={styles.sectionTitle}>Seus números</Text>
            <View style={styles.numbersRow}>
              {selectedNumbers.map((number) => (
                <NumberSelector
                  key={number}
                  number={number}
                  isSelected={drawnNumbers.includes(number)}
                  isWrong={!drawnNumbers.includes(number)}
                />
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.playAgainButton} 
          onPress={() => navigation.replace('NumberPicker')}
        >
          <Text style={styles.playAgainButtonText}>Jogar novamente</Text>
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
    flex: 1,
    alignItems: 'center',
    gap: 20,
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
    gap: 15,
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
    width: '100%',
    gap: 20,
  },
  numbersSection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#272729',
  },
  numbersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  playAgainButton: {
    backgroundColor: '#65C56C',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  playAgainButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 