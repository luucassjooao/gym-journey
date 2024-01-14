import {Ref, forwardRef, useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {styles} from './styles';

interface InputAppProps extends TextInputProps {
  error?: string;
}

const InputApp = forwardRef((props: InputAppProps, ref: Ref<TextInput>) => {
  const {error, ...restProps} = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      ref={ref}
      style={[
        styles.input,
        isFocused && styles.inputFocused,
        error ? styles.error : null,
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...restProps}
    />
  );
});

export default InputApp;
