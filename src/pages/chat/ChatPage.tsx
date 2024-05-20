import OpenAiChatView from "../../components/openai-chat-view/OpenAiChatView";
import RegularChatView from "../../components/regular-chat-view/RegularChatView";
import { useLazyGetMessagesQuery } from "../../services/message.service";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { StoreState } from "../../store";
import { ChatContainer } from "../../components/common/chat.components";

const ChatPage = () => {
  const { id, email, accessToken } = useSelector(
    (store: StoreState) => store.auth
  );

  const [getMessages, { isLoading, isError, isSuccess, data }] =
    useLazyGetMessagesQuery();

  useEffect(() => {
    if (accessToken)
      getMessages({
        accessToken,
        withResponse: true,
      });
  }, [accessToken]);

  return (
    <ChatContainer>
      <RegularChatView
        messagesData={data}
        isSuccess={isSuccess}
        id={id}
        email={email}
        isLoading={isLoading}
      />
      <OpenAiChatView
        messagesData={data}
        isSuccess={isSuccess}
        id={id}
        email={email}
        isLoading={isLoading}
      />
    </ChatContainer>
  );
};

export default ChatPage;
