import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../hooks/useAuth';
import AuthForm from '../../components/authForm';

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [IsSubmitting, setIsSubmitting] = useState(false);

  const {signIn} = useAuth();

  async function handleSubmit() {
    setIsSubmitting(true);

    try {
      await signIn(email, password);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Ouve algum erro ao você tentar fazer o login!',
        text2: 'Tente novamente!',
        position: 'bottom',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthForm
      type="signin"
      email={email}
      password={password}
      isSubmitting={IsSubmitting}
      setName={() => {}}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}
