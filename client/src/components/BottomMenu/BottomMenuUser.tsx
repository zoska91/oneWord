import { FC } from 'react';
import { Redirect } from 'react-router';
import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SettingsIcon } from '@chakra-ui/icons';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PreferencesFormBottom from 'components/ModalForm/PreferencesFormBottom';
import AddWordForm from 'components/ModalForm/AddWordForm';
import * as S from './BottomMenu.css';
import useBottomMenuUser from './useBottomMenuUser';
import EditWordForm from 'components/WordsList/EditWordForm';
import WordsList from 'components/WordsList/WordsList';

interface BottomMenuUserProps {}

const BottomMenuUser: FC<BottomMenuUserProps> = () => {
  const { t } = useTranslation();
  const {
    redirect,
    isAddWord,
    openMenu,
    actions,
    setOpenMenu,
    setIsAddWord,
    isWordsList,
    setIsWordsList,
  } = useBottomMenuUser();

  return (
    <>
      {redirect ? (
        <Redirect to='/' />
      ) : (
        <S.WrapperBottomMenuUser>
          <S.Header fontSize='3xl'>{t(`form.addWordTitle`)}</S.Header>
          <AddWordForm />
          <S.PreferencesContainer isAddWord={isAddWord}>
            {!isAddWord && (
              <>
                <S.Header fontSize='3xl' paddingRight={10}>
                  {t(
                    `form.${
                      isWordsList ? 'wordsListTitle' : 'preferencesTitle'
                    }`
                  )}

                  <SpeedDial
                    direction='down'
                    ariaLabel='Menu'
                    icon={<MoreVertIcon fontSize='small' />}
                    onClose={() => setOpenMenu(false)}
                    onOpen={() => setOpenMenu(true)}
                    open={openMenu}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 10,
                      height: 50,
                    }}
                  >
                    {actions.map(action => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => {
                          action.onClick();
                          setOpenMenu(false);
                        }}
                      />
                    ))}
                  </SpeedDial>
                </S.Header>
                {isWordsList ? (
                  <WordsList type='mobile' />
                ) : (
                  <PreferencesFormBottom openMenu={openMenu} />
                )}
                <Grid templateColumns='repeat(3, 1fr)' gap={1} p={2}></Grid>
              </>
            )}

            {isAddWord && (
              <button onClick={() => setIsAddWord(false)}>
                <SettingsIcon w={6} h={6} color='#ffffffae' />
              </button>
            )}
          </S.PreferencesContainer>
        </S.WrapperBottomMenuUser>
      )}
    </>
  );
};

export default BottomMenuUser;
