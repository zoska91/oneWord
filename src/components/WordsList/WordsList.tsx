import { FC } from 'react';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Spiner from 'components/atoms/Spiner';

import * as S from './WordList.css';
import useWordsList from './useWordsList';
import ModalEditWord from './ModalEditWord';

interface WordsListProps {}

const WordsList: FC<WordsListProps> = () => {
  const { words, deleteWord, statusDict, editWord, editingWord } =
    useWordsList();

  const wordsListRender = [...words].map(el => (
    <S.SingleWord key={el.wordId} status={el.status}>
      <span>{el.basicWord}</span>
      <span>{el.transWord}</span>
      <span className='status'>{statusDict[el.status]}</span>
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
          <ul>{wordsListRender}</ul>
          {editingWord && (
            <ModalEditWord
              data={editingWord}
              isOpen={editingWord ? true : false}
              onClose={() => editWord(null)}
            />
          )}
        </S.Wrapper>
      )}
    </>
  );
};

export default WordsList;
