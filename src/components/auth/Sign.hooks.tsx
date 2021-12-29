import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IAuth } from '../ModalForm/formTypes';
import { loginByEmail, singInByGoogle } from 'db/API/auth';
import { createNotification } from 'common/notifications';
import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { addDefaultSettingsIfNotExistsAPI } from 'db/API/settings';

const useSign = () => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);
  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IAuth> = ({ email, password }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user.uid) {
          loginByEmail(email, password);
          addDefaultSettingsIfNotExistsAPI(user.uid);
        }
      })
      .catch(error => {
        if (error.code === 'auth/weak-password')
          createNotification(t('api.weakPassword'), 'error');

        if (error.code === 'auth/email-already-in-use')
          createNotification(t('api.existsMail'), 'error');

        throw { code: error.code, error: error.message };
      });
  };

  const googleSubmit = async () => {
    const result = await singInByGoogle();
    if (result.token && result.user) {
      setRedirect(true);
      addDefaultSettingsIfNotExistsAPI(result.user.uid);
    }
  };

  return { redirect, methods, handleSubmit, onSubmit, googleSubmit };
};

export default useSign;
