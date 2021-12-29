import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { loginByEmail, singInByGoogle } from 'db/API/auth';
import { createNotification } from 'common/notifications';
import { addDefaultSettingsIfNotExistsAPI } from 'db/API/settings';
import { IAuth } from 'components/ModalForm/formTypes';

const useLogin = () => {
  const { t } = useTranslation();

  const [redirect, setRedirect] = useState<boolean>(false);

  const methods = useForm<IAuth>();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IAuth> = async ({ email, password }) => {
    try {
      const resp: any = await loginByEmail(email, password);

      if (resp.code === 'auth/user-not-found') {
        createNotification(t('auth.userNotFound'), 'error');
        return;
      }

      if (resp.code === 'auth/wrong-password') {
        createNotification(t('auth.wrongPassword'), 'error');
        return;
      }

      if (resp.code) {
        createNotification(t('auth.error'), 'error');
        return;
      }

      setRedirect(true);
    } catch (e) {
      console.error(e);
    }
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

export default useLogin;
