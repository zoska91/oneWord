import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/Button';
import { useGlobalState } from 'state';

import * as S from './Views.css';

interface AppearViewProps {}

const AppearView: FC<AppearViewProps> = () => {
  const { t } = useTranslation();

  const [todaysWord] = useGlobalState('todaysWord');
  const [isAnswerShow, setIsAnswerShow] = useGlobalState('isAnswerShow');

  return (
    <>
      {isAnswerShow ? (
        <S.Word>{todaysWord.transWord}</S.Word>
      ) : (
        <Button onClick={() => setIsAnswerShow(prev => !prev)} dark>
          {t('showTranslate')}
        </Button>
      )}
    </>
  );
};

export default AppearView;
