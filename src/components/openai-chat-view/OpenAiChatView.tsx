import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import LoadingPage from "../../pages/loading/LoadingPage";
import ChatViewLayout from "../../layouts/view-layout/ChatViewLayout";
import Messages from "../messages/Messages";
import { TextField } from "@mui/material";
import { showNotification } from "../../utils/notifications";
import { toMessageWithResponseObjects } from "../../utils/messages";
import { useSelector } from "react-redux";
import { IMessageObject } from "../../types/messages.types";
import { IChatViewProps } from "../../types/chat.types";
import { StoreState } from "../../store";
import { NormalTextButton } from "../common/button.components";
import { WidthBox } from "../common/chat.components";
import { CenteredBox } from "../common/appBar.components";

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
    <ChatViewLayout>
      {isLoading && <LoadingPage />}

      {!isLoading && (
        <WidthBox>
          <h1>Open AI Chat View</h1>
          <Messages messages={messages} />

          <CenteredBox>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter message..."
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

export default OpenAiChatView;
