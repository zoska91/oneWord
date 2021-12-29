import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox, FormControl } from '@chakra-ui/react';
import { Desc, FormLabel } from 'components/ModalForm/Form.css';

interface CheckboxFieldProps {
  name: string;
  required?: boolean;
  desc?: boolean;
}

const CheckboxField: FC<CheckboxFieldProps> = ({ name, required, desc }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const { t } = useTranslation();
  const values = getValues();
  console.log(name, values[name]);
  return (
    <FormControl isInvalid={Boolean(errors[name])}>
      <FormControl isInvalid={Boolean(errors.summary)}>
        <Checkbox
          isChecked={values[name]}
          {...register(name, {
            // @ts-ignore
            required: required ? t('form.require') : null,
          })}
        >
          <FormLabel>{t(`form.${name}Label`)}</FormLabel>
        </Checkbox>
        {desc && <Desc>{t(`form.${name}Desc`)}</Desc>}
      </FormControl>
    </FormControl>
  );
};

export default CheckboxField;
