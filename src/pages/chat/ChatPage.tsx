import { useLazyGetMessagesQuery } from "../../services/message.service";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { StoreState } from "../../store";
import { ChatContainer } from "../../components/common/chat.components";
import ChatView from "../../components/messages/ChatView";
import { EChatViewType } from "../../types/chat.types";
import { Alert } from "@mui/material";
import { EAlertSeverity } from "../../types/common";

const ChatPage = () => {
  const { id, email, accessToken } = useSelector(
    (store: StoreState) => store.auth
  );

  const [getMessages, { isLoading, isError, isSuccess, data, error }] =
    useLazyGetMessagesQuery();

  useEffect(() => {
    if (accessToken)
      getMessages({
        accessToken,
        withResponse: true,
      });
  }, [accessToken]);

  return (
    <>
      {isError && (
        <Alert severity={EAlertSeverity.error}>
          {(error as any).data.message}
        </Alert>
      )}

      {isSuccess && (
        <ChatContainer>
          <ChatView
            messagesData={data}
            isSuccess={isSuccess}
            id={id}
            email={email}
            isLoading={isLoading}
            chatViewType={EChatViewType.regular}
            title="Regular Chat View"
          />
          <ChatView
            messagesData={data}
            isSuccess={isSuccess}
            id={id}
            email={email}
            isLoading={isLoading}
            chatViewType={EChatViewType.openAi}
            title="OpenAI Chat View"
          />
        </ChatContainer>
      )}
    </>
  );
};

export default ChatPage;
