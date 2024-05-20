import { IMessageComponentProps } from "../../types/messages.types";
import {
  MessageContainer,
  MessageSender,
  MessageText,
} from "../common/message.components";

const Message = ({ messageObject }: IMessageComponentProps) => {
  const [name, messageString] = messageObject.message.split(": ");

  return (
    <MessageContainer>
      <MessageSender>{name}</MessageSender>
      <MessageText>{messageString}</MessageText>
    </MessageContainer>
  );
};

export default Message;
