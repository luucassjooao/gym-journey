import {Ref, forwardRef, useState} from 'react';
import {ColorValue, TextInput, TextInputProps} from 'react-native';
import {styles} from './styles';

interface InputAppProps extends TextInputProps {
  error?: string;
  width?: number;
  background?: ColorValue;
  colorText?: ColorValue;
}

const InputApp = forwardRef((props: InputAppProps, ref: Ref<TextInput>) => {
  const {error, width, background, colorText, ...restProps} = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      ref={ref}
      style={[
        styles.input,
        isFocused && styles.inputFocused,
        error ? styles.error : null,
        {
          width: `${width}%` || '100%',
          backgroundColor: background || '#8075ff',
          color: colorText || '#fff',
        },
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...restProps}
    />
  );
});

export default InputApp;
