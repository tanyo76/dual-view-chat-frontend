import Message from "./Message";
import { useEffect, useRef } from "react";
import {
  IMessageObject,
  IMessagesComponentProps,
} from "../../types/messages.types";
import { MessagesContainer } from "../common/message.components";

const Messages = ({ messages }: IMessagesComponentProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesContainerRef.current?.scroll({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [messages]);

  return (
    <MessagesContainer ref={messagesContainerRef}>
      {messages.map((message: IMessageObject) => (
        <Message messageObject={message} key={message.id} />
      ))}
    </MessagesContainer>
  );
};

export default Messages;
