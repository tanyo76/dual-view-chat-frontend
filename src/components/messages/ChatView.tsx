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
import { useDispatch, useSelector } from "react-redux";
import { IMessageObject } from "../../types/messages.types";
import { StoreState } from "../../store";
import { showNotification } from "../../utils/notifications";
import {
  toMessageObjects,
  toMessageWithResponseObjects,
} from "../../utils/messages";
import {
  disableChatInputs,
  enableChatInputs,
  hideChatErrorMessage,
  showChatErrorMessage,
} from "../../store/slices/auth.slice";
import { ChatErrorMessage } from "../feedback/ChatErrorMessage";

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

  const { accessToken, disableChatActions, chatErrorObject } = useSelector(
    (store: StoreState) => store.auth
  );

  const dispatch = useDispatch();

  const closeChatErrorMessageHandler = () => {
    dispatch(hideChatErrorMessage());
  };

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

  const hideRespondingElement = () => {
    setMessages((prevState: IMessageObject[]) =>
      prevState.filter((message) => message.id !== "1")
    );
  };

  useEffect(() => {
    const onMessageHandler = (message: IMessageObject) => {
      showNotification(message.message);
      setMessages((prevState: IMessageObject[]) => [...prevState, message]);
    };

    const onOpenAiMessage = (message: IMessageObject) => {
      setMessages((prevState: IMessageObject[]) =>
        [...prevState, message].filter((message) => message.id !== "1")
      );
      showNotification(message.message);
      dispatch(enableChatInputs());
      closeChatErrorMessageHandler();
    };

    socket.on("message", onMessageHandler);
    socket.on("error", (error: any) => {
      const message = error.response;
      dispatch(showChatErrorMessage(message));
      dispatch(enableChatInputs());
      hideRespondingElement();
    });

    if (chatViewType === EChatViewType.openAi) {
      socket.on("openAiMessage", onOpenAiMessage);
    }

    if (chatViewType === EChatViewType.openAi) {
      socket.on("responding", () => {
        setMessages((prevState: IMessageObject[]) => [
          ...prevState,
          { id: "1", message: "Responding..." },
        ]);
      });
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
      dispatch(disableChatInputs());
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

          {chatErrorObject.isError && (
            <ChatErrorMessage
              message={chatErrorObject.message}
              openState={chatErrorObject.isError}
              onClose={closeChatErrorMessageHandler}
            />
          )}

          <CenteredBox>
            <TextField
              fullWidth
              disabled={disableChatActions}
              size="small"
              placeholder="Enter a message..."
              onChange={onMessageChangeHandler}
              value={message}
              onKeyDown={onEnterKeySendHandler}
            />
            <NormalTextButton
              disabled={disableChatActions}
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
