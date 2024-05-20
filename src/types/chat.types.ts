import { IMessageObject } from "./messages.types";

export interface IChatViewProps {
  messagesData: IMessageObject[] | undefined;
  isSuccess: boolean;
  id: string;
  email: string;
  isLoading: boolean;
}

export interface IChatViewTemplateProps {
  isLoading: boolean;
  messages: IMessageObject[];
  inputMessage: string;
  sendMessage: any;
  onMessageChangeHandler: any;
  onEnterKeySendHandler: any;
}
