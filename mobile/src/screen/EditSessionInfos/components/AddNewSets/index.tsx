import {useState} from 'react';
import {Rows, TableWrapper} from 'react-native-reanimated-table';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from 'react-native';
import ModalApp from '../../../../components/Modal';
import {Text} from 'react-native';
import OptionsApp from '../../../../components/Options';
import InputWithVerification from '../InputWithVerification';
import ButtonApp from '../../../../components/Button';
import {
  IHelpedReps,
  IPartials,
  IUseSomeEquipment,
  TSubmitSerieInfos,
} from '../../../../utils/types/Exercise';
import * as S from './styles';

interface IProps {
  handleUpdateInfosOfSeries: (x: Omit<TSubmitSerieInfos, 'exerciseId'>) => void;
  handleChangeAddNewSetToFalse: () => void;
}

export default function AddNewSets({
  handleUpdateInfosOfSeries,
  handleChangeAddNewSetToFalse,
}: IProps) {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [partials, setPartials] = useState<IPartials>({
    havePartials: false,
    reps: 0,
  });
  const [helpedReps, setHelpedReps] = useState<IHelpedReps>({
    haveHelped: false,
    reps: 0,
  });
  const [useSomeEquipment, setUseSomeEquipment] = useState<IUseSomeEquipment>({
    use: false,
    listOfEquipment: [],
  });
  const [rateSerie, setRateSerie] = useState<string>('');
  const [typeOfSerie, setTypeOfSerie] = useState<string>('');

  const [openModal, setOpenModal] = useState<boolean>(false);

  function ConvertNumber(value: string): number {
    const numbers = value.replace(/\D/g, '');

    if (numbers === '') {
      return 0;
    } else {
      return parseInt(numbers, 10);
    }
  }

  function handleChangeWeight(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    const numberResult = ConvertNumber(event.nativeEvent.text);
    setWeight(numberResult);
  }
  function handleChangeReps(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    const numberResult = ConvertNumber(event.nativeEvent.text);
    setReps(numberResult);
  }
  function handleChangeHavePartials(event: boolean) {
    setPartials(prevState => {
      return {
        ...prevState,
        havePartials: event,
      };
    });
  }
  function handleChangePartials(
    numberOfReps: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setPartials(prevState => {
      const numberResult = ConvertNumber(numberOfReps.nativeEvent.text);
      return {
        ...prevState,
        reps: numberResult,
      };
    });
  }
  function handleChangeHaveHelpedReps(event: boolean) {
    setHelpedReps(prevState => {
      return {
        ...prevState,
        haveHelped: event,
      };
    });
  }
  function handleChangeHelpedReps(
    numberOfReps: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setHelpedReps(prevState => {
      const numberResult = ConvertNumber(numberOfReps.nativeEvent.text);
      return {
        ...prevState,
        reps: numberResult,
      };
    });
  }
  function handleChangeUseSomeEquipment(event: boolean) {
    setUseSomeEquipment(prevState => {
      return {
        ...prevState,
        use: event,
      };
    });
  }
  function handleChangeUseSomethingList(nameOfEquipment: string) {
    setUseSomeEquipment(prevState => {
      if (prevState.listOfEquipment.some(i => i === nameOfEquipment)) {
        return {
          ...prevState,
          listOfEquipment: prevState.listOfEquipment.filter(
            i => i !== nameOfEquipment,
          ),
        };
      }
      return {
        ...prevState,
        listOfEquipment: [...prevState.listOfEquipment, nameOfEquipment],
      };
    });
  }
  function handleChangeRateSerie(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setRateSerie(event.nativeEvent.text);
  }
  function handleChangeTypeOfSerie(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setTypeOfSerie(event.nativeEvent.text);
  }

  function cancelOnModal() {
    setPartials({
      havePartials: false,
      reps: 0,
    });
    setHelpedReps({
      haveHelped: false,
      reps: 0,
    });
    setUseSomeEquipment({
      listOfEquipment: [],
      use: false,
    });
    setRateSerie('');

    setOpenModal(false);
  }

  function cancelSerie() {
    setWeight(0);
    setReps(0);
    cancelOnModal();

    handleChangeAddNewSetToFalse();
  }

  function submitSerieInfos() {
    handleUpdateInfosOfSeries({
      helpedReps,
      partials,
      rateSerie,
      reps,
      useSomeEquipment,
      weight,
      typeOfSerie,
    });
  }

  return (
    <>
      <TableWrapper borderStyle={styles.borderStyle} style={{marginLeft: 2}}>
        <Rows
          data={[
            [
              <S.TextInput
                placeholder={'? Reps'}
                value={String(reps) === '0' ? '' : String(reps)}
                onChange={handleChangeReps}
              />,
              <S.TextInput
                placeholder={'? Peso'}
                value={String(weight) === '0' ? '' : String(weight)}
                onChange={handleChangeWeight}
              />,
              <S.TextInput
                placeholder={'? Qual o tipo desta serie'}
                value={typeOfSerie}
                onChange={handleChangeTypeOfSerie}
              />,
              <S.ButtonMoreInfos onPress={() => setOpenModal(true)}>
                <S.Text>+ Infos</S.Text>
              </S.ButtonMoreInfos>,
            ],
          ]}
          style={{
            backgroundColor: '#a184da',
            height: 35,
          }}
        />
      </TableWrapper>
      <ButtonApp
        text="Cancelar Serie"
        style={{backgroundColor: '#f00'}}
        onPress={cancelSerie}
      />
      <ButtonApp text="Confirmar Serie" onPress={submitSerieInfos} />
      {openModal && (
        <ModalApp
          cancelLabel="Cancelar"
          confirmLabel="Confirmar"
          onCancel={cancelOnModal}
          onConfirm={() => setOpenModal(false)}
          title="Quais informações a mais que voce quer registrar?"
          visible={openModal}
          danger={false}>
          <Text>Teve repetições parciais?</Text>
          <OptionsApp
            firstOption="Sim"
            secondOption="Não"
            firstValue={true}
            secondValue={false}
            valueOfOptions={partials.havePartials}
            handleChangeValue={handleChangeHavePartials}
          />
          <InputWithVerification
            description="Quantas repetições parciais?"
            valueState={partials.reps}
            verification={partials.havePartials}
            handleChangeValue={handleChangePartials}
          />
          <Text>Teve repetições forçadas/ajudadas?</Text>
          <OptionsApp
            firstOption="Sim"
            secondOption="Não"
            firstValue={true}
            secondValue={false}
            valueOfOptions={helpedReps.haveHelped}
            handleChangeValue={handleChangeHaveHelpedReps}
          />
          <InputWithVerification
            description="Quantas repetições forçadas/ajudadas?"
            valueState={helpedReps.reps}
            verification={helpedReps.haveHelped}
            handleChangeValue={handleChangeHelpedReps}
          />
          <Text>Usou algum tipo de equipamento/ergogenio mecanico?</Text>
          <OptionsApp
            firstOption="Sim"
            secondOption="Não"
            firstValue={true}
            secondValue={false}
            valueOfOptions={useSomeEquipment.use}
            handleChangeValue={handleChangeUseSomeEquipment}
          />
          <InputWithVerification
            description="Quais equipamentos voce utilizou?"
            valueState={useSomeEquipment.listOfEquipment}
            verification={useSomeEquipment.use}
            handleChangeValue={handleChangeUseSomethingList}
            isArray
            listOfArray={['strap', 'belt', 'chalk']}
            titleForDropdown="Selecione os equipamentos"
          />
          <InputWithVerification
            description="Como voce rankea está serie?"
            valueState={rateSerie}
            verification={true}
            handleChangeValue={handleChangeRateSerie}
          />
        </ModalApp>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  head: {
    backgroundColor: '#6320eeff',
  },
  textWhiteText: {
    color: '#fff',
  },
  borderStyle: {
    borderWidth: 2,
    borderColor: '#1f005d',
  },
  rowsStyle: {
    backgroundColor: '#cab9ed',
    height: 25,
  },
});
