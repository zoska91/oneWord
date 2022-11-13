import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { logOut } from 'db/API/auth';

import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SettingsIcon from '@material-ui/icons/Settings';

const useBottomMenuUser = () => {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [isAddWord, setIsAddWord] = useState<boolean>(true);
  const [isWordsList, setIsWordsList] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLogout = async () => {
    const result = await logOut();
    if (result === 'success') setRedirect(true);
  };

  const actions = [
    {
      icon: <PlaylistAddOutlinedIcon />,
      name: t('actionsBottomMenu.addWord'),
      onClick: () => {
        setIsAddWord(true);
      },
    },
    {
      icon: <FormatListBulletedOutlinedIcon />,
      name: t('actionsBottomMenu.wordsList'),
      onClick: () => setIsWordsList(true),
    },
    {
      icon: <ExitToAppOutlinedIcon />,
      name: t('actionsBottomMenu.logout'),
      onClick: () => handleLogout(),
    },
    {
      icon: <SettingsIcon />,
      name: t('actionsBottomMenu.preferences'),
      onClick: () => setIsWordsList(false),
    },
  ];

  return {
    redirect,
    isAddWord,
    openMenu,
    actions,
    setOpenMenu,
    setIsAddWord,
    isWordsList,
    setIsWordsList,
  };
};

export default useBottomMenuUser;
