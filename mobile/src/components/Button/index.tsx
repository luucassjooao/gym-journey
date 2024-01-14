import {TouchableOpacityProps} from 'react-native';
import {PressableButton, TextButton} from './style';

interface ButtonAppProps extends TouchableOpacityProps {
  text: string;
}

export default function ButtonApp({text, ...props}: ButtonAppProps) {
  return (
    <PressableButton {...props}>
      <TextButton>{text}</TextButton>
    </PressableButton>
  );
}
