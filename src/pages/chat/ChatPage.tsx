import { Box } from "@mui/material";
import OpenAiChatView from "../../components/openai-chat-view/OpenAiChatView";
import RegularChatView from "../../components/regular-chat-view/RegularChatView";
import { useLazyGetMessagesQuery } from "../../services/message.service";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ChatPage = () => {
  const { id, email, accessToken } = useSelector((store: any) => store.auth);

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
    <Box sx={{ display: "flex" }}>
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
    </Box>
  );
};

export default ChatPage;
