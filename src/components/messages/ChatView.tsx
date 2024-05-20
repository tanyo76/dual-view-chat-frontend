import { TextField } from "@mui/material";
import ChatViewLayout from "../../layouts/view-layout/ChatViewLayout";
import LoadingPage from "../../pages/loading/LoadingPage";
import { CenteredBox } from "../common/appBar.components";
import { WidthBox } from "../common/chat.components";
import Messages from "./Messages";
import { NormalTextButton } from "../common/button.components";
import { IChatViewTemplateProps } from "../../types/chat.types";

const ChatView = ({
  isLoading,
  messages,
  inputMessage,
  sendMessage,
  onMessageChangeHandler,
  onEnterKeySendHandler,
}: IChatViewTemplateProps) => {
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
              value={inputMessage}
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
