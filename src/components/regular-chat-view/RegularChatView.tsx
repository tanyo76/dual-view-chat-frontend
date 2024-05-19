import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../services/message.service";
import LoadingPage from "../../pages/loading/LoadingPage";
import ChatViewLayout from "../../layouts/view-layout/ChatViewLayout";
import Messages from "../messages/Messages";
import { Box, Button, TextField } from "@mui/material";
import { showNotification } from "../../utils/notifications";

const RegularChatView = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as any);
  const { id, email, accessToken } = useSelector((store: any) => store.auth);

  const { isLoading, isError, isSuccess, data } = useGetMessagesQuery({
    accessToken,
  });

  useEffect(() => {
    if (isSuccess) {
      const messages = data.map(
        (message: any) => `${message.user.email}: ${message.message}`
      );
      setMessages(messages);
    }
  }, [isSuccess]);

  useEffect(() => {
    const onMessageHandler = (message: string) => {
      showNotification(message);
      setMessages((prevState: any) => [...prevState, message]);
    };

    socket.connect();

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
    <ChatViewLayout>
      {isLoading && <LoadingPage />}

      {!isLoading && (
        <Box sx={{ width: "90%" }}>
          <h1>Regular Chat View</h1>

          <Messages messages={messages} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
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

export default RegularChatView;
