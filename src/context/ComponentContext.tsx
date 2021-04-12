import React, { PropsWithChildren, useContext, useMemo } from 'react';

import type { NimbleEmojiIndex, NimbleEmojiProps, NimblePickerProps } from 'emoji-mart';

import type { AttachmentProps } from '../components/Attachment/Attachment';
import type { AvatarProps } from '../components/Avatar/Avatar';
import type { DateSeparatorProps } from '../components/DateSeparator/DateSeparator';
import type { EventComponentProps } from '../components/EventComponent/EventComponent';
import type { MessageUIComponentProps, PinIndicatorProps } from '../components/Message/types';
import type { MessageDeletedProps } from '../components/Message/MessageDeleted';
import type { MessageInputProps } from '../components/MessageInput/MessageInput';
import type { ReactionSelectorProps } from '../components/Reactions/ReactionSelector';
import type { ReactionsListProps } from '../components/Reactions/ReactionsList';

import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../types/types';

export type ComponentContextValue<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
> = {
  Attachment: React.ComponentType<AttachmentProps<At>>;
  Emoji: React.ComponentType<NimbleEmojiProps>;
  EmojiIndex: NimbleEmojiIndex;
  EmojiPicker: React.ComponentType<NimblePickerProps>;
  Message: React.ComponentType<MessageUIComponentProps<At, Ch, Co, Ev, Me, Re, Us>>;
  Avatar?: React.ComponentType<AvatarProps>;
  DateSeparator?: React.ComponentType<DateSeparatorProps>;
  EditMessageInput?: React.ComponentType<MessageInputProps<At, Ch, Co, Ev, Me, Re, Us>>;
  HeaderComponent?: React.ComponentType;
  MessageDeleted?: React.ComponentType<MessageDeletedProps<At, Ch, Co, Ev, Me, Re, Us>>;
  MessageSystem?: React.ComponentType<EventComponentProps<At, Ch, Co, Ev, Me, Re, Us>>;
  PinIndicator?: React.ComponentType<PinIndicatorProps<At, Ch, Co, Ev, Me, Re, Us>>;
  ReactionSelector?: React.ForwardRefExoticComponent<ReactionSelectorProps<Re, Us>>;
  ReactionsList?: React.ComponentType<ReactionsListProps<Re, Us>>;
};

export const ComponentContext = React.createContext<ComponentContextValue>(
  {} as ComponentContextValue,
);

export const ComponentProvider = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
>({
  children,
  value,
}: PropsWithChildren<{
  value: Partial<ComponentContextValue<At, Ch, Co, Ev, Me, Re, Us>>;
}>) => {
  const existingValue = useComponentContext<At, Ch, Co, Ev, Me, Re, Us>();

  // prevent undefined values from replaced defined ones
  const Attachment = value.Attachment || existingValue.Attachment;
  const Avatar = value.Avatar || existingValue.Avatar;
  const DateSeparator = value.DateSeparator || existingValue.DateSeparator;
  const EditMessageInput = value.EditMessageInput || existingValue.EditMessageInput;
  const Emoji = value.Emoji || existingValue.Emoji;
  const EmojiIndex = value.EmojiIndex || existingValue.EmojiIndex;
  const EmojiPicker = value.EmojiPicker || existingValue.EmojiPicker;
  const HeaderComponent = value.HeaderComponent || existingValue.HeaderComponent;
  const Message = value.Message || existingValue.Message;
  const MessageDeleted = value.MessageDeleted || existingValue.MessageDeleted;
  const MessageSystem = value.MessageSystem || existingValue.MessageSystem;
  const PinIndicator = value.PinIndicator || existingValue.PinIndicator;
  const ReactionSelector = value.ReactionSelector || existingValue.ReactionSelector;
  const ReactionsList = value.ReactionsList || existingValue.ReactionsList;

  const memoizedValue = useMemo(
    () => ({
      Attachment,
      Avatar,
      DateSeparator,
      EditMessageInput,
      Emoji,
      EmojiIndex,
      EmojiPicker,
      HeaderComponent,
      Message,
      MessageDeleted,
      MessageSystem,
      PinIndicator,
      ReactionSelector,
      ReactionsList,
    }),
    [
      Attachment,
      Avatar,
      DateSeparator,
      EditMessageInput,
      Emoji,
      EmojiIndex,
      EmojiPicker,
      HeaderComponent,
      Message,
      MessageDeleted,
      MessageSystem,
      PinIndicator,
      ReactionSelector,
      ReactionsList,
    ],
  );

  return (
    <ComponentContext.Provider value={(memoizedValue as unknown) as ComponentContextValue}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
>() =>
  (useContext(ComponentContext) as unknown) as ComponentContextValue<At, Ch, Co, Ev, Me, Re, Us>;

/**
 * Typescript currently does not support partial inference, so if ComponentContext
 * typing is desired while using the HOC withComponentContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withComponentContext = <
  P extends UnknownType,
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, keyof ComponentContextValue<At, Ch, Co, Ev, Me, Re, Us>>> => {
  const WithComponentContextComponent = (
    props: Omit<P, keyof ComponentContextValue<At, Ch, Co, Ev, Me, Re, Us>>,
  ) => {
    const componentContext = useComponentContext<At, Ch, Co, Ev, Me, Re, Us>();

    return <Component {...(props as P)} {...componentContext} />;
  };

  WithComponentContextComponent.displayName = (
    Component.displayName ||
    Component.name ||
    'Component'
  ).replace('Base', '');

  return WithComponentContextComponent;
};
