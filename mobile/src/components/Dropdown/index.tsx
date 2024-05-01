import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface IProps<T> {
  mainList: T[];
  buttonDefaultMessage: string;
  handleSelectOption(option: string): void;
  buttonAfterSelectMessage: string;
  width?: number;
}

export default function DropdownApp<T>({
  mainList,
  buttonAfterSelectMessage,
  buttonDefaultMessage,
  handleSelectOption,
  width,
}: IProps<T>) {
  return (
    <SelectDropdown
      data={mainList}
      defaultButtonText={buttonDefaultMessage}
      onSelect={s => {
        handleSelectOption(s);
      }}
      buttonTextAfterSelection={() => {
        return buttonAfterSelectMessage;
      }}
      buttonStyle={[styles.dropdown1BtnStyle, {width: width ? width : '100%'}]}
      buttonTextStyle={styles.dropdown1BtnTxtStyle}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdown1DropdownStyle}
      rowStyle={styles.dropdown1RowStyle}
      rowTextStyle={styles.dropdown1RowTxtStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 14,
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});
