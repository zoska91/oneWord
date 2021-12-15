import { FC, useEffect, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  FormProvider,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack, Grid, Box } from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';

import * as S from './Form.css';
import { IInputsPreferences } from './formTypes';
import useGenerateOptionsFields from './useGenereteOptionsFields';
import SelectField from 'components/atoms/Inputs/SelectInput';
import CheckboxField from 'components/atoms/Inputs/CheckboxField';
import InputField from 'components/atoms/Inputs/InputField';
import ModalFooter from './ModalFooter';
import { getUserSettingsAPI } from 'db/API/settings';
import Spiner from 'components/atoms/Spiner';
import { ISettings } from 'types/api';

interface PreferencesFormProps {
  onClose: () => void;
}

const PreferencesForm: FC<PreferencesFormProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [defaultValues, setDefaultValues] = useState<ISettings | null>(null);

  const { selectLanguageOptions, daysOptions, learnTypesOptions } =
    useGenerateOptionsFields();

  const methods = useForm();
  const { control, handleSubmit, watch, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'notifications',
  });
  const watchSummary = watch('isSummary');
  const watchBreak = watch('isBreak');

  const getUserSettings = async () => {
    const resp = await getUserSettingsAPI();
    if (resp) setDefaultValues(resp.data);
  };

  useEffect(() => {
    getUserSettings();
  }, []);

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues]);

  const onSubmit: SubmitHandler<IInputsPreferences> = data => console.log(data);

  return (
    <>
      {selectLanguageOptions.length === 0 ? (
        <Spiner />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid gap={16} templateColumns='repeat(2, 1fr)'>
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
                    <SelectField
                      name='summaryDay'
                      options={daysOptions}
                      required
                    />
                  )}

                  <CheckboxField name='isBreak' desc />
                  {watchBreak && (
                    <SelectField
                      name='breakDay'
                      options={daysOptions}
                      required
                    />
                  )}
                </Stack>
              </Box>

              {/* right side */}
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
            </Grid>
            <ModalFooter onClose={onClose} />
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default PreferencesForm;
