import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Desc, FormLabel } from 'components/ModalForm/Form.css';

interface InputFieldProps {
  name: string;
  required?: boolean;
  desc?: boolean;
  type?: string;
  noLabel?: boolean;
}

const themeInput = {
  bg: 'white',
  focusBorderColor: '#2e2757',
};

const InputField: FC<InputFieldProps> = ({ name, required, desc, type = 'text', noLabel }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  return (
    <FormControl isInvalid={Boolean(errors[name])}>
      {!noLabel && <FormLabel>{t(`form.${name}Label`)}</FormLabel>}
      {desc && <Desc>{t(`form.${name}Desc`)}</Desc>}
      <Input
        placeholder={t(`form.${name}Placeholder`)}
        {...themeInput}
        {...register(name, {
          // @ts-ignore
          required: required ? t('form.require') : null,
        })}
        type={type}
      />
      <FormErrorMessage>{errors?.[name] && errors[name].message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
