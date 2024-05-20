import { TextField, Typography } from "@mui/material";
import ChatViewLayout from "../../layouts/view-layout/ChatViewLayout";
import LoadingPage from "../../pages/loading/LoadingPage";
import { CenteredBox } from "../common/appBar.components";
import { WidthBox } from "../common/chat.components";
import Messages from "./Messages";
import { NormalTextButton } from "../common/button.components";
import { EChatViewType, IChatViewProps } from "../../types/chat.types";
import { socket } from "../../utils/socket";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMessageObject } from "../../types/messages.types";
import { StoreState } from "../../store";
import { showNotification } from "../../utils/notifications";
import {
  toMessageObjects,
  toMessageWithResponseObjects,
} from "../../utils/messages";

const ChatView = ({
  messagesData,
  isSuccess,
  id,
  email,
  isLoading,
  chatViewType,
  title,
}: IChatViewProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessageObject[]>([]);

  const { accessToken } = useSelector((store: StoreState) => store.auth);

  useEffect(() => {
    if (isSuccess) {
      if (chatViewType === EChatViewType.openAi) {
        toMessageWithResponseObjects(messagesData, setMessages);
      }

      if (chatViewType === EChatViewType.regular) {
        toMessageObjects(messagesData, setMessages);
      }
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

    if (chatViewType === EChatViewType.openAi) {
      socket.on("openAiMessage", onMessageHandler);
    }

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
    <ChatViewLayout>
      {isLoading && <LoadingPage />}

      {!isLoading && (
        <WidthBox>
          <Typography variant="h6">{title}</Typography>
          <Messages messages={messages} />

          <CenteredBox>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter a message..."
              onChange={onMessageChangeHandler}
              value={message}
              onKeyDown={onEnterKeySendHandler}
            />
            <NormalTextButton
              onClick={sendMessage}
              variant="contained"
              sx={{ marginLeft: "10px" }}
            >
              send
            </NormalTextButton>
          </CenteredBox>
        </WidthBox>
      )}
    </ChatViewLayout>
  );
};

export default ChatView;
