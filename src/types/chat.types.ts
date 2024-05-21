import { IMessageObject } from "./messages.types";

export interface IChatViewProps {
  messagesData: IMessageObject[] | undefined;
  isSuccess: boolean;
  id: string;
  email: string;
  isLoading: boolean;
  chatViewType: EChatViewType;
  title?: string;
}

export enum EChatViewType {
  regular = "REGULAR",
  openAi = "OPENAI",
}

export interface IChatErrorMessageProps {
  message: string;
  openState: boolean;
  onClose: any;
}
