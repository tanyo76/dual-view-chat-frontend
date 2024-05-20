import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { showNotification } from "../../utils/notifications";
import { toMessageWithResponseObjects } from "../../utils/messages";
import { useSelector } from "react-redux";
import { IMessageObject } from "../../types/messages.types";
import { IChatViewProps } from "../../types/chat.types";
import { StoreState } from "../../store";
import ChatView from "../messages/ChatView";

const OpenAiChatView = ({
  messagesData,
  isSuccess,
  isLoading,
  id,
  email,
}: IChatViewProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessageObject[]>([]);

  const { accessToken } = useSelector((store: StoreState) => store.auth);

  useEffect(() => {
    if (isSuccess) {
      toMessageWithResponseObjects(messagesData, setMessages);
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
      setMessages((prevState: IMessageObject[]) => [...prevState, message]);
    };

    socket.on("message", onMessageHandler);
    socket.on("openAiMessage", onMessageHandler);

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

export default OpenAiChatView;
