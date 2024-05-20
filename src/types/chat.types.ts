import { IMessageObject } from "./messages.types";

export interface IChatViewProps {
  messagesData: IMessageObject[] | undefined;
  isSuccess: boolean;
  id: string;
  email: string;
  isLoading: boolean;
}
