import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Select, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Desc, FormLabel } from 'components/ModalForm/Form.css';

interface SelectFieldProps {
  name: string;
  required?: boolean;
  desc?: boolean;
  options: { value: string | number; label: string }[];
  label?: JSX.Element | string;
}

const themeInput = {
  bg: 'white',
  focusBorderColor: '#2e2757',
};

const SelectField: FC<SelectFieldProps> = ({
  name,
  required,
  desc,
  options,
  label,
}) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const { t } = useTranslation();
  const values = getValues();

  return (
    <FormControl isInvalid={Boolean(errors[name])}>
      {label ? label : <FormLabel>{t(`form.${name}Label`)}</FormLabel>}
      {desc && <Desc>{t(`form.${name}Desc`)}</Desc>}
      <Select
        defaultValue={values[name]}
        placeholder={label ? t('form.select') : t(`form.${name}Placeholder`)}
        {...themeInput}
        {...register(name, {
          // @ts-ignore
          required: required ? t('form.require') : null,
        })}
      >
        {options.map((el, i) => (
          <option key={`${el.value}-${i}`} value={el.value}>
            {el.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>
        {errors?.[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SelectField;
