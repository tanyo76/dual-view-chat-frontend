import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import LoadingPage from "../../pages/loading/LoadingPage";
import ChatViewLayout from "../../layouts/view-layout/ChatViewLayout";
import Messages from "../messages/Messages";
import { Box, Button, TextField } from "@mui/material";
import { showNotification } from "../../utils/notifications";
import { toMessageWithResponseObjects } from "../../utils/messages";
import { useSelector } from "react-redux";

const OpenAiChatView = ({
  messagesData,
  isSuccess,
  isLoading,
  id,
  email,
}: any) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as any);

  const { accessToken } = useSelector((store: any) => store.auth);

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
    const onMessageHandler = (message: any) => {
      showNotification(message.message);
      setMessages((prevState: string[]) => [...prevState, message]);
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
        <Box
          sx={{
            width: "90%",
          }}
        >
          <h1>Open AI Chat View</h1>
          <Messages messages={messages} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Enter message..."
              onChange={onMessageChangeHandler}
              value={message}
              onKeyDown={onEnterKeySendHandler}
            />
            <Button
              onClick={sendMessage}
              variant="contained"
              sx={{ marginLeft: "10px" }}
            >
              send
            </Button>
          </Box>
        </Box>
      )}
    </ChatViewLayout>
  );
};

export default OpenAiChatView;
