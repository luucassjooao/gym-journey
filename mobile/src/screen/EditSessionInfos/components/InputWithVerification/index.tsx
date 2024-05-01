import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import {View} from 'react-native';
import DropdownApp from '../../../../components/Dropdown';

interface IProps {
  description: string;
  placeholder?: string;
  verification: boolean;
  valueState: string | number | string[];
  handleChangeValue(
    e: NativeSyntheticEvent<TextInputChangeEventData> | string,
  ): void;
  isArray?: boolean;
  listOfArray?: string[];
  titleForDropdown?: string;
}

export default function InputWithVerification({
  description,
  placeholder,
  verification,
  valueState,
  handleChangeValue,
  isArray,
  listOfArray,
  titleForDropdown,
}: IProps) {
  return (
    <View>
      {verification ? (
        <>
          <Text>{description}</Text>
          {isArray ? (
            <DropdownApp
              buttonAfterSelectMessage={(valueState as string[])
                .map(i => i)
                .join(' & ')}
              buttonDefaultMessage={titleForDropdown || 'Selecione'}
              handleSelectOption={handleChangeValue}
              mainList={listOfArray!}
            />
          ) : (
            <TextInput
              placeholder={placeholder}
              value={
                typeof valueState === 'string' ? valueState : String(valueState)
              }
              onChange={handleChangeValue}
              style={{backgroundColor: '#c0c0c0'}}
            />
          )}
        </>
      ) : null}
    </View>
  );
}
