import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalState } from 'state';

import * as S from './Views.css';

interface InputViewProps {}

const InputView: FC<InputViewProps> = () => {
  const { t } = useTranslation();
  const [currentAnswer, setCurrentAnswer] = useGlobalState('currentAnswer');
  const [todaysWord] = useGlobalState('todaysWord');
  const [isAnswerShow] = useGlobalState('isAnswerShow');

  return (
    <>
      {isAnswerShow ? (
        <S.Word>{todaysWord.transWord}</S.Word>
      ) : (
        <S.WordAnswerInput
          autoFocus={true}
          placeholder={t('yourAnswer')}
          value={typeof currentAnswer === 'string' ? currentAnswer : ''}
          onChange={e => setCurrentAnswer(e.target.value.toUpperCase())}
        />
      )}
    </>
  );
};

export default InputView;
