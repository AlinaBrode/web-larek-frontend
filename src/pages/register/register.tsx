import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/user-slice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('userName email password', name, email, password);
    dispatch(registerUser({ email, name, password }));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
