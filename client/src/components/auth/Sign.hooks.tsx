import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IAuth } from '../ModalForm/formTypes';
import {  singInByGoogle } from 'db/API/auth';
import { createNotification } from 'common/notifications';
import { addDefaultSettingsIfNotExistsAPI } from 'db/API/settings';
import { api } from 'api';

const useSign = () => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);
  const methods = useForm<IAuth>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IAuth> = async ({ email, password }) => {
    try {
      const {data} = await api.register({email, password})
      if(data.message ==='success') setRedirect(true);
      else createNotification(t('api.error'), 'error');

    } catch(e) {
      // @ts-ignore
      if(e.response.data.message ) createNotification(e.response.data.message, 'error');
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

export default useSign;
