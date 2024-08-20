import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { setUserData } from '../../services/slices/user-slice';

export const Profile: FC = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: data.name,
    email: data.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: data.name,
      email: data.email
    }));
  }, [data]);

  const isFormChanged =
    formValue.name !== data.name ||
    formValue.email !== data.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setUserData(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: data.name,
      email: data.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
