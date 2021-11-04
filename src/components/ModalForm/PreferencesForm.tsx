import { FC, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Stack,
  Select,
  FormControl,
  FormErrorMessage,
  ModalFooter,
  Checkbox,
  Grid,
  Box,
  Input,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { IInputsPreferences } from './formTypes';
import Button from 'components/atoms/Button';

import * as S from './PreferencesForm.css';

interface PreferencesFormProps {
  onClose: () => void;
}

const themeInput = {
  bg: 'white',
  focusBorderColor: '#2e2757',
};

const PreferencesForm: FC<PreferencesFormProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'notifications',
  });

  const onSubmit: SubmitHandler<IInputsPreferences> = data => console.log(data);

  const watchSmmary = watch('summary', true);
  const watchBreak = watch('break', true);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid gap={16} templateColumns='repeat(2, 1fr)'>
        <Box>
          <Stack>
            <FormControl isInvalid={Boolean(errors.lang)}>
              <S.FormLabel>
                {t('preferencesForm.selectLanguageYouWantToLearn')}
              </S.FormLabel>
              <S.Desc>{t('preferencesForm.weSelectedLangs')}</S.Desc>
              <Select
                placeholder={t('selectLanguage')}
                {...themeInput}
                {...register('lang', { required: 'This is required' })}
              >
                <option value='1'>English</option>
                <option value='2'>Polish</option>
                <option value='3'>Japan</option>
              </Select>
              <FormErrorMessage>
                {errors?.lang && errors.lang.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.summary)}>
              <Checkbox defaultIsChecked {...register('summary')}>
                <S.FormLabel>{t('preferencesForm.summary')}</S.FormLabel>
              </Checkbox>
              <S.Desc>{t('preferencesForm.summaryDesc')}</S.Desc>
            </FormControl>

            {watchSmmary && (
              <FormControl isInvalid={Boolean(errors.summaryDay)}>
                <S.FormLabel>{t('preferencesForm.selectDay')}</S.FormLabel>
                <Select
                  placeholder={t('preferencesForm.selectDayPlaceholder')}
                  {...themeInput}
                  {...register('summaryDay', { required: 'This is required' })}
                >
                  <option value='1'>Monday</option>
                  <option value='2'>Teusday</option>
                </Select>
                <FormErrorMessage>
                  {errors?.summaryDay && errors.summaryDay.message}
                </FormErrorMessage>
              </FormControl>
            )}

            <FormControl isInvalid={Boolean(errors.break)}>
              <Checkbox defaultIsChecked {...register('break')}>
                <S.FormLabel>{t('preferencesForm.break')}</S.FormLabel>
              </Checkbox>
              <S.Desc>{t('preferencesForm.breakDesc')}</S.Desc>
            </FormControl>

            {watchBreak && (
              <FormControl isInvalid={Boolean(errors.summaryDay)}>
                <S.FormLabel>{t('preferencesForm.selectDayBreak')}</S.FormLabel>
                <Select
                  placeholder={t('preferencesForm.selectDayBreakPlaceholder')}
                  {...themeInput}
                  {...register('breakDay', { required: 'This is required' })}
                >
                  <option value='1'>Monday</option>
                  <option value='2'>Teusday</option>
                </Select>
                <FormErrorMessage>
                  {errors?.breakDay && errors.breakDay.message}
                </FormErrorMessage>
              </FormControl>
            )}
          </Stack>
        </Box>

        {/* right side */}
        <Box>
          <Stack>
            <S.FormLabel big>
              <p>{t('preferencesForm.addDailyNotification')} </p>
              <S.ActionButton
                type='button'
                isAdd
                onClick={() => append({ type: 'showWord', time: '12:42' })}
              >
                <AddIcon color='white' w={3} height={3} />
              </S.ActionButton>
            </S.FormLabel>
            <S.Desc>{t('preferencesForm.itIsTheClue')}</S.Desc>

            {fields.map((item, index) => (
              <Stack spacing={4} key={item.id}>
                <FormControl isInvalid={Boolean(errors.selectTypeOfLearn)}>
                  <S.FormLabel>
                    <p>{index + 1}. notification</p>
                    <S.ActionButton type='button' onClick={() => remove(index)}>
                      <DeleteIcon />
                    </S.ActionButton>
                  </S.FormLabel>
                  <Select
                    placeholder={t('preferencesForm.selectTypeOfLearn')}
                    {...themeInput}
                    {...register(`notifications.${index}.type`, {
                      required: 'This is required',
                    })}
                  >
                    <option value='1'>Show word</option>
                    <option value='2'>Quiz</option>
                    <option value='3'>Gues word</option>
                    <option value='3'>Appear word </option>
                  </Select>
                  <FormErrorMessage>
                    {errors?.selectTypeOfLearn &&
                      errors.selectTypeOfLearn.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.summary)}>
                  <Input
                    placeholder='Translated word'
                    // value='11:14'
                    {...themeInput}
                    {...register(`notifications.${index}.time`, {
                      required: 'This is required',
                    })}
                    type='time'
                  />
                  <FormErrorMessage>
                    {errors?.basicWord && errors.basicWord.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Grid>

      <ModalFooter
        justifyContent='space-between'
        style={{ paddingTop: '80px' }}
      >
        <Button small onClick={onClose}>
          Close
        </Button>
        <Button dark small type='submit'>
          zapisz
        </Button>
      </ModalFooter>
    </form>
  );
};

export default PreferencesForm;
