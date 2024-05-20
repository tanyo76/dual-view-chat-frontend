import Message from "./Message";
import { useEffect, useRef } from "react";
import {
  IMessageObject,
  IMessagesComponentProps,
} from "../../types/messages.types";
import { MessagesContainer } from "../common/message.components";
import { Typography } from "@mui/material";

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
      {!!messages.length &&
        messages.map((message: IMessageObject) => (
          <Message messageObject={message} key={message.id} />
        ))}

      {!messages.length && (
        <>
          <Typography>No messages yet...</Typography>
          <Typography>Ask the OpenAI Model</Typography>
        </>
      )}
    </MessagesContainer>
  );
};

export default Messages;
