import {Modal} from 'react-native';
import * as S from './styles';
import ButtonApp from '../Button';
import { FlatList } from 'react-native-gesture-handler';

interface IModal {
  danger?: boolean;
  visible: boolean;
  title: string;
  isLoading?: boolean;
  children: JSX.Element | JSX.Element[];
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  noPaddingOnTop?: boolean;
  isFlatList?: boolean;
}

export default function ModalApp({
  danger = false,
  visible,
  title,
  isLoading,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  noPaddingOnTop = false,
  isFlatList,
}: IModal) {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <S.Overlay>
        <S.Container noPaddingOnTop={noPaddingOnTop}>
          <S.Title danger={danger}>{title}</S.Title>

          {isFlatList ? (
            <>
              {children}
              </>
          ) : (
            <S.ModalBody>{children}</S.ModalBody>
          )}

          <S.Footer>
            <ButtonApp
              onPress={onCancel}
              disabled={isLoading}
              text={cancelLabel}
              style={{
                paddingHorizontal: 8,
                width: 120,
                marginRight: 4,
                marginLeft: 4,
                backgroundColor: '#f00',
              }}
            />

            {confirmLabel !== '' && (
              <ButtonApp
                onPress={onConfirm}
                disabled={isLoading}
                text={confirmLabel}
                style={{
                  paddingHorizontal: 8,
                  width: 120,
                  marginRight: 4,
                  marginLeft: 4,
                }}
              />
            )}
          </S.Footer>
        </S.Container>
      </S.Overlay>
    </Modal>
  );
}
