import { FC } from 'react';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Spiner from 'components/atoms/Spiner';

import * as S from './WordList.css';
import useWordsList from './useWordsList';
import ModalEditWord from './ModalEditWord';
import EditWordForm from './EditWordForm';

interface WordsListProps {
  type?: string;
}

const WordsList: FC<WordsListProps> = ({ type }) => {
  const {
    words,
    deleteWord,
    statusDict,
    editWord,
    editingWord,
    saveEditingWord,
  } = useWordsList();

  const wordsListRender = [...words].map(el => (
    <S.SingleWord key={el.wordId}>
      <S.DataWord status={el.status}>
        <span>{el.basicWord}</span>
        <span>{el.transWord}</span>
        <span className='status'>{statusDict[el.status]}</span>
      </S.DataWord>
      <div>
        <EditIcon onClick={() => editWord(el)} />
        <DeleteIcon
          onClick={() => (el.wordId ? deleteWord(el.wordId) : null)}
        />
      </div>
    </S.SingleWord>
  ));

  return (
    <>
      {words.length === 0 ? (
        <Spiner />
      ) : (
        <S.Wrapper>
          {type === 'mobile' && editingWord ? (
            <EditWordForm
              onClose={() => editWord(null)}
              data={editingWord}
              saveEditingWord={saveEditingWord}
            />
          ) : (
            <ul>{wordsListRender}</ul>
          )}

          {type !== 'mobile' && editingWord && (
            <ModalEditWord
              isOpen={editingWord ? true : false}
              onClose={() => editWord(null)}
              data={editingWord}
              saveEditingWord={saveEditingWord}
            />
          )}
        </S.Wrapper>
      )}
    </>
  );
};

export default WordsList;
