import { IChatDetails } from '@store/chatListSlice/types';
import { PropsWithChildren } from 'react';

export interface ISocketProviderProps extends PropsWithChildren {}

export interface IPrivateMessage extends IChatDetails {}

export interface IReadMessage {
	from: string;
	to: string;
}

export interface IReceiveMessage extends IChatDetails {}

export type TSendMessageCallback = (messageObj: IReceiveMessage) => void;

export interface ISocketContext {
	sendPrivateMessage: (content: string) => void;
	disconnectSocket: () => void;
}

export type TUserStatus = 'online' | 'typing...' | 'offline';
