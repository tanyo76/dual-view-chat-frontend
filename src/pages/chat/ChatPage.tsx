import { Box } from "@mui/material";
import OpenAiChatView from "../../components/openai-chat-view/OpenAiChatView";
import RegularChatView from "../../components/regular-chat-view/RegularChatView";

const ChatPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <RegularChatView />
      <OpenAiChatView />
    </Box>
  );
};

export default ChatPage;
