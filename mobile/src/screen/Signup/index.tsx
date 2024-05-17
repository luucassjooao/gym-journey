import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../hooks/useAuth';
import AuthForm from '../../components/authForm';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {signUp} = useAuth();

  async function handleSubmit() {
    setIsSubmitting(true);

    try {
      await signUp(name, email, password);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Ouve algum erro ao voce tentar fazer o seu cadastro!',
        text2: 'Tente novamente!',
        position: 'bottom',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthForm
      type="signup"
      email={email}
      password={password}
      isSubmitting={isSubmitting}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}
