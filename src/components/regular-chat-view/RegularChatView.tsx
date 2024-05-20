import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import LoadingPage from "../../pages/loading/LoadingPage";
import ChatViewLayout from "../../layouts/view-layout/ChatViewLayout";
import Messages from "../messages/Messages";
import { Box, TextField } from "@mui/material";
import { showNotification } from "../../utils/notifications";
import { toMessageObjects } from "../../utils/messages";
import { useSelector } from "react-redux";
import { IChatViewProps } from "../../types/chat.types";
import { StoreState } from "../../store";
import { IMessageObject } from "../../types/messages.types";
import { NormalTextButton } from "../common/button.components";
import { WidthBox } from "../common/chat.components";
import { CenteredBox } from "../common/appBar.components";
import ChatView from "../messages/ChatView";

const RegularChatView = ({
  messagesData,
  isSuccess,
  id,
  email,
  isLoading,
}: IChatViewProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessageObject[]>([]);

  const { accessToken } = useSelector((store: StoreState) => store.auth);

  useEffect(() => {
    if (isSuccess) {
      toMessageObjects(messagesData, setMessages);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (accessToken) {
      socket.io.opts.extraHeaders = {
        authorization: `Bearer ${accessToken}`,
      };

      socket.open();
    }
  }, [accessToken]);

  useEffect(() => {
    const onMessageHandler = (message: IMessageObject) => {
      showNotification(message.message);
      setMessages((prevState) => [...prevState, message]);
    };

    socket.on("message", onMessageHandler);

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.length) {
      const messagePayload = {
        id,
        email,
        message,
      };
      socket.emit("message", messagePayload);
      setMessage("");
    }
  };

  const onMessageChangeHandler = (e: any) => {
    const value = e.target.value;
    setMessage(value);
  };

  const onEnterKeySendHandler = (e: any) => {
    const key = e.key;

    if (key === "Enter") sendMessage();
  };

  return (
    <ChatView
      isLoading={isLoading}
      messages={messages}
      inputMessage={message}
      sendMessage={sendMessage}
      onMessageChangeHandler={onMessageChangeHandler}
      onEnterKeySendHandler={onEnterKeySendHandler}
    />
  );
};

export default RegularChatView;
