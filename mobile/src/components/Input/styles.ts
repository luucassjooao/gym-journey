import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: 18,
    backgroundColor: '#8075ff',
    color: '#fff',
    borderRadius: 8,
    borderColor: 'rgba(106, 93, 255, 0.3)',
    borderWidth: 1,
  },
  inputFocused: {
    borderColor: 'rgba(106, 93, 255, 1)',
  },
  error: {
    borderColor: 'rgba(255, 0, 0, 1)',
  },
});
