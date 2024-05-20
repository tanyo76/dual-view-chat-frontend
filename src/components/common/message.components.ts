import { Box, styled } from "@mui/material";

export const MessagesContainer = styled(Box)({
  height: "70vh",
  width: "100%",
  overflow: "auto",
  padding: "10px",
  margin: "10px 0px",
  backgroundColor: "lightgray",
  borderRadius: "5px",
});

export const MessageContainer = styled(Box)({
  margin: "5px 0px",
  padding: "10px",
  borderRadius: "5px",
  backgroundColor: "lightgray",
});

export const MessageSender = styled("p")({ fontWeight: "bold" });

export const MessageText = styled("p")({ padding: "5px 0px" });
