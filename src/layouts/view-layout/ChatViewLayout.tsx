import { Box } from "@mui/material";

const ChatViewLayout = ({ children }: any) => {
  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "88vh",
        padding: "10px",
      }}
    >
      {children}
    </Box>
  );
};

export default ChatViewLayout;
