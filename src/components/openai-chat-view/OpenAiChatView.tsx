import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../services/message.service";
import LoadingPage from "../../pages/loading/LoadingPage";
import ChatViewLayout from "../../layouts/view-layout/ChatViewLayout";
import Messages from "../messages/Messages";
import { Box, Button, TextField } from "@mui/material";
import { showNotification } from "../../utils/notifications";

const OpenAiChatView = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as any);
  const { id, email, accessToken } = useSelector((store: any) => store.auth);

  const { isLoading, isError, isSuccess, data } = useGetMessagesQuery({
    accessToken,
    withResponse: true,
  });

  useEffect(() => {
    if (isSuccess) {
      data.forEach((message: any) => {
        const messageString = `${message.user.email}: ${message.message}`;
        const responseString = `Assistant: ${message.response.message}`;
        setMessages((prevState: any) => [
          ...prevState,
          messageString,
          responseString,
        ]);
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    const onMessageHandler = (message: string) => {
      showNotification(message);
      setMessages((prevState: string[]) => [...prevState, message]);
    };

    socket.connect();

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
