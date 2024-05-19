import { Box } from "@mui/material";
import Message from "./Message";
import { useEffect, useRef } from "react";

const Messages = ({ messages }: any) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesContainerRef.current?.scroll({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [messages]);

  return (
    <Box
      ref={messagesContainerRef}
      sx={{
        height: "70vh",
        width: "100%",
        overflow: "auto",
        padding: "10px",
        margin: "10px 0px",
        backgroundColor: "lightgray",
        borderRadius: "5px",
      }}
    >
      {messages.map((message: string) => (
        <Message message={message} />
      ))}
    </Box>
  );
};

export default Messages;