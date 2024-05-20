export interface IMessageObject {
  id: string;
  message: string;
}

export interface IMessageComponentProps {
  messageObject: IMessageObject;
}

export interface IMessagesComponentProps {
  messages: IMessageObject[];
}
