import * as S from './styles';
import ModalApp from '../../Modal';
import {useState} from 'react';
import SessionService from '../../../service/SessionService';
import Toast from 'react-native-toast-message';
import {useQuery} from '@tanstack/react-query';
import {PrivateRouteNavitationProp} from '../../../routes/private';
import {useNavigation} from '@react-navigation/native';
import MuscleGroupService from '../../../service/MuscleGroupService';
import type {IReturnDataGetMusclesGroups} from '../../../service/MuscleGroupService';
import DropdownApp from '../../Dropdown';
import {queryClient} from '../../../../App';
import {ISession} from '../../../utils/types/Session';

interface IProps {
  isModalVisible: boolean;
  switchModalVisible: () => void;
}

export default function CreateNewSession({
  isModalVisible,
  switchModalVisible,
}: IProps) {
  const [selectedMusclesGroups, setSelectedMusclesGroups] = useState<
    IReturnDataGetMusclesGroups[]
  >([]);
  const [typeSession, setTypeSession] = useState<string>('');

  const navigation = useNavigation<PrivateRouteNavitationProp>();

  const {data} = useQuery({
    queryKey: ['Muscles'],
    queryFn: async (): Promise<IReturnDataGetMusclesGroups[] | undefined> =>
      MuscleGroupService.getAllMusclesGroups(),
  });

  const namesOfMusclesGroups: string[] = data?.map(mg => mg.name) || [];
  const idsOfSelectedsMusclesGroups: string[] = selectedMusclesGroups.map(
    mg => mg.id,
  );

  function handleSelectMuscleGroup(muscleGroup: string) {
    setSelectedMusclesGroups(prevState => {
      if (prevState.some(({name}) => name === muscleGroup)) {
        return prevState.filter(({name}) => name !== muscleGroup);
      }
      const getFullObjectOfMuscleGroupSelected: IReturnDataGetMusclesGroups =
        data?.find(mg => mg.name === muscleGroup)!;
      delete getFullObjectOfMuscleGroupSelected?.media;
      return [...prevState, getFullObjectOfMuscleGroupSelected];
    });
  }

  async function handleConfirm() {
    try {
      const createSession = await SessionService.createNewSession({
        typeSession,
        musclesGroupId: selectedMusclesGroups.map(mg => mg.id),
      });

      queryClient.setQueryData(['HomeSessions'], (oldData: ISession[]) => {
        return [...(oldData || []), createSession];
      });

      navigation.navigate('editSessionInfos', {
        nameOfMusclesGroups: selectedMusclesGroups.map(e => e.name),
        sessionId: createSession.id,
        idOfMusclesGroups: idsOfSelectedsMusclesGroups,
      });

      Toast.show({
        type: 'success',
        text1: 'Sessao de treino criada!',
        position: 'bottom',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Nao foi possivel criar está sessao de treino!',
        position: 'bottom',
      });
    } finally {
      switchModalVisible();
      setSelectedMusclesGroups([]);
    }
  }

  return (
    <ModalApp
      title="O Treino de hoje vai ser..."
      cancelLabel="CANCELAR"
      confirmLabel="Confirmar"
      onCancel={() => switchModalVisible()}
      onConfirm={() => handleConfirm()}
      visible={isModalVisible}>
      <S.Container>
        <DropdownApp
          mainList={namesOfMusclesGroups}
          buttonDefaultMessage="Selecione o treino"
          buttonAfterSelectMessage={selectedMusclesGroups
            .map(mg => mg.name)
            .join(' & ')}
          handleSelectOption={handleSelectMuscleGroup}
          width={250}
        />

        <DropdownApp
          mainList={['DELOAD', 'STRENGTH', 'HYPERTROPHY']}
          buttonDefaultMessage="Tipo de treino"
          buttonAfterSelectMessage={typeSession}
          handleSelectOption={setTypeSession}
          width={250}
        />
      </S.Container>
    </ModalApp>
  );
}
