import {ReactNode} from 'react';
import {View} from 'react-native';
import {ErrorText, FormItem} from './styles';

type FormGroupType = {
  children: ReactNode;
  isLoading?: boolean;
  error?: string;
};

export default function FormGroup({children, error}: FormGroupType) {
  return (
    <View>
      <FormItem>{children}</FormItem>
      {error && <ErrorText>{error}</ErrorText>}
    </View>
  );
}
