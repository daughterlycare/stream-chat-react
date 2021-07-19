import React from 'react';

import { ChannelListMessengerProps } from 'stream-chat-react';

import { Chats } from '../../assets/Chats';
// import { HamburgerIcon } from '../../assets/HamburgerIcon';
import { Mentions } from '../../assets/Mentions';
// import { NewChat } from '../../assets/NewChat';

import './SocialChannelList.scss';

type Props = ChannelListMessengerProps & {
  isNewChat: boolean;
  isSideDrawerOpen: boolean,
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>,
  setSideDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const SocialChannelList: React.FC<Props> = (props) => {
  const { children, isNewChat, isSideDrawerOpen, setNewChat, setSideDrawerOpen } = props;

  const ListHeaderWrapper: React.FC<Props> = (props) => {
    const { children, isNewChat, isSideDrawerOpen, setNewChat, setSideDrawerOpen } = props;

    return (
      <div className='channel-list'>
        {children}
      </div>
    );
  };

  return (
    <ListHeaderWrapper { ...{ isNewChat, isSideDrawerOpen, setNewChat, setSideDrawerOpen}}>{children}</ListHeaderWrapper>
  );
};

