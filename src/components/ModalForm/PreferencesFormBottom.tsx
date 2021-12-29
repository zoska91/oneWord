import { Box, Center, Stack } from '@chakra-ui/react';
import CheckboxField from 'components/atoms/Inputs/CheckboxField';
import SelectField from 'components/atoms/Inputs/SelectInput';
import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import usePreferencesForm from './PreferencesForm.hooks';
import useGenerateOptionsFields from './useGenereteOptionsFields';

import * as S from './Form.css';
import { useTranslation } from 'react-i18next';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import InputField from 'components/atoms/Inputs/InputField';
import Button from 'components/atoms/Button';

const Form = styled.form`
  padding: 0 20px;
  height: 80%;
  overflow-y: auto;
  width: 100%;
  overflow-x: hidden;
`;

const Separator = styled.hr`
  background-color: ${({ theme }) => theme.colorPrimary};
  height: 2px;
  margin: 30px 0;
`;

interface PreferencesFormBottomProps {}

const PreferencesFormBottom: FC<PreferencesFormBottomProps> = () => {
  const { t } = useTranslation();

  const { selectLanguageOptions, daysOptions, learnTypesOptions } =
    useGenerateOptionsFields();

  const {
    onSubmit,
    watchSummary,
    watchBreak,
    handleSubmit,
    fields,
    append,
    methods,
    remove,
  } = usePreferencesForm();

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Stack>
            <SelectField
              name='selectLanguage'
              options={selectLanguageOptions}
              required
              desc
            />

            <CheckboxField name='isSummary' desc />
            {watchSummary && (
              <SelectField name='summaryDay' options={daysOptions} required />
            )}

            <CheckboxField name='isBreak' desc />
            {watchBreak && (
              <SelectField name='breakDay' options={daysOptions} required />
            )}
          </Stack>
        </Box>
        <Separator />
        <Box>
          <Stack>
            <S.FormLabel big>
              <p>{t('form.addDailyNotification')} </p>
              <S.ActionButton
                type='button'
                isAdd
                onClick={() => append({ type: 1, time: '00:00' })}
              >
                <AddIcon color='white' w={3} height={3} />
              </S.ActionButton>
            </S.FormLabel>

            <S.Desc>{t('form.itIsTheClue')}</S.Desc>

            {fields.map((item, index) => (
              <Stack spacing={4} key={`${item.id}-${index}`}>
                <SelectField
                  name={`notifications.${index}.type`}
                  options={learnTypesOptions}
                  required
                  label={
                    <S.FormLabel>
                      <p>{index + 1}. notification</p>
                      <S.ActionButton
                        type='button'
                        onClick={() => remove(index)}
                      >
                        <DeleteIcon />
                      </S.ActionButton>
                    </S.FormLabel>
                  }
                />
                <InputField
                  name={`notifications.${index}.time`}
                  required
                  type='time'
                  noLabel
                />
              </Stack>
            ))}
          </Stack>
        </Box>
        <Center style={{ margin: '30px 0' }}>
          <Button secondaryColor type='submit'>
            {t('buttons.submit')}
          </Button>
        </Center>
      </Form>
    </FormProvider>
  );
};

export default PreferencesFormBottom;
