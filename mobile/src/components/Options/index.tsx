import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';

interface IProps {
  firstOption: string;
  firstValue: boolean;
  secondOption: string;
  secondValue: boolean;
  valueOfOptions: string | boolean;
  handleChangeValue(
    e:
      | string
      | string[]
      | number
      | boolean
      | NativeSyntheticEvent<TextInputChangeEventData>,
  ): void;
}

export default function OptionsApp({
  firstOption,
  secondOption,
  firstValue,
  secondValue,
  valueOfOptions,
  handleChangeValue,
}: IProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.optionButton,
          valueOfOptions === firstOption && styles.selectedOption,
        ]}
        onPress={() => handleChangeValue(firstValue)}>
        <Text style={styles.optionText}>{firstOption}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          valueOfOptions === secondOption && styles.selectedOption,
        ]}
        onPress={() => handleChangeValue(secondValue)}>
        <Text style={styles.optionText}>{secondOption}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#c0c0c0',
  },
  optionText: {
    color: '#000',
    textAlign: 'center',
  },
});
