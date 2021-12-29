import AddWordForm from 'components/ModalForm/AddWordForm';
import { Grid, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { SettingsIcon } from '@chakra-ui/icons';
import { flexCenter } from 'styles/mixins';
import { logOut } from 'db/API/auth';
import { Redirect } from 'react-router';
import PreferencesFormBottom from 'components/ModalForm/PreferencesFormBottom';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface BottomMenuUserProps {}

interface StylesProps {
  isAddWord?: boolean;
}

const Wrapper = styled.div`
  padding-top: 40px;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Header = styled(Text)<StylesProps>`
  position: relative;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorPrimary};
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
  transition: 0.5s;

  .MuiSpeedDialAction-staticTooltipLabel {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colorPrimary};
    display: flex;
    width: 120px;
    flex-direction: row-reverse;
  }

  .MuiFab-root {
    width: 40px;
  }
`;

const PreferencesContainer = styled.div<StylesProps>`
  padding-top: ${({ isAddWord }) => (isAddWord ? 0 : '20px')};
  position: absolute;
  background-color: ${({ theme, isAddWord }) =>
    isAddWord ? theme.colorSecondary : theme.colorLight};
  width: 60px;
  height: 60px;
  bottom: 0;
  right: 0;
  border-radius: 30px 5px 0 30px;
  transition: 0.4s;

  ${flexCenter}

  ${({ isAddWord }) =>
    !isAddWord &&
    css`
      display: block;
      width: 100%;
      height: 100%;
      bottom: -20px;
      border-radius: 20px 20px 0 0;
    `}
`;

const BottomMenuUser: FC<BottomMenuUserProps> = () => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [isAddWord, setIsAddWord] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLogout = async () => {
    const result = await logOut();
    if (result === 'success') setRedirect(true);
  };

  const actions = [
    {
      icon: <PlaylistAddOutlinedIcon />,
      name: 'add word',
      onClick: () => {
        setIsAddWord(true);
      },
    },
    {
      icon: <FormatListBulletedOutlinedIcon />,
      name: 'words list',
      onClick: () => {
        console.log('tu będzie lista');
      },
    },
    {
      icon: <ExitToAppOutlinedIcon />,
      name: 'logout',
      onClick: () => handleLogout(),
    },
  ];

  return (
    <>
      {redirect ? (
        <Redirect to='/' />
      ) : (
        <Wrapper>
          <Header fontSize='3xl'>{t(`form.addWordTitle`)}</Header>
          <AddWordForm />
          <PreferencesContainer isAddWord={isAddWord}>
            {!isAddWord && (
              <>
                <Header fontSize='3xl' paddingRight={10}>
                  {t(`form.preferencesTitle`)}

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
                </Header>
                <PreferencesFormBottom openMenu={openMenu} />
                <Grid templateColumns='repeat(3, 1fr)' gap={1} p={2}></Grid>
              </>
            )}

            {isAddWord && (
              <button onClick={() => setIsAddWord(false)}>
                <SettingsIcon w={6} h={6} color='#ffffffae' />
              </button>
            )}
          </PreferencesContainer>
        </Wrapper>
      )}
    </>
  );
};

export default BottomMenuUser;
