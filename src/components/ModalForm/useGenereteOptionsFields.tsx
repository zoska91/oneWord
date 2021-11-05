import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface option {
  value: string | number;
  label: string;
}

const useGenerateOptionsFields = () => {
  const { t } = useTranslation();

  //TODO from DB
  const [addLangOptions, setAddLangOptions] = useState<option[]>([]);
  const [selectLanguageOptions, setSelectLanguageOptions] = useState<option[]>(
    []
  );

  const daysOptions = [
    { value: 1, label: t('days.1') },
    { value: 2, label: t('days.2') },
    { value: 3, label: t('days.3') },
    { value: 4, label: t('days.4') },
    { value: 5, label: t('days.5') },
    { value: 6, label: t('days.6') },
    { value: 7, label: t('days.7') },
  ];

  const learnTypesOptions = [
    { value: '1', label: 'Show word' },
    { value: '2', label: 'Quiz' },
    { value: '3', label: 'Gues word' },
    { value: '3', label: 'Appear word ' },
  ];

  useEffect(() => {
    setAddLangOptions([
      { label: 'English', value: 'en' },
      { label: 'Japan', value: 'jp' },
      { label: 'Polish', value: 'pl' },
    ]);

    setSelectLanguageOptions([
      { label: 'English', value: 'en' },
      { label: 'Japan', value: 'jp' },
      { label: 'Polish', value: 'pl' },
    ]);
  }, []);

  return {
    addLangOptions,
    selectLanguageOptions,
    daysOptions,
    learnTypesOptions,
  };
};

export default useGenerateOptionsFields;
