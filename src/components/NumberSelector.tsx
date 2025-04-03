import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NumberSelectorProps {
  number: number;
  isSelected: boolean;
  isWrong?: boolean;
  onPress?: () => void;
}

export function NumberSelector({ number, isSelected, isWrong, onPress }: NumberSelectorProps) {
  const BallComponent = onPress ? TouchableOpacity : View;
  
  return (
    <BallComponent
      style={[
        styles.selector,
        isSelected && styles.selectedSelector,
        isWrong && styles.wrongSelector
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.number,
        (isSelected || isWrong) && styles.selectedNumber
      ]}>
        {number.toString().padStart(2, '0')}
      </Text>
    </BallComponent>
  );
}

const styles = StyleSheet.create({
  selector: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  selectedSelector: {
    backgroundColor: '#65C56C',
  },
  wrongSelector: {
    backgroundColor: '#F44444',
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  selectedNumber: {
    color: '#FFFFFF',
  },
}); 