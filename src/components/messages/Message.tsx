import { Box } from "@mui/material";

const Message = ({ message }: any) => {
  const [name, messageString] = message.split(": ");

  return (
    <Box
      sx={{
        margin: "5px 0px",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "lightgray",
      }}
    >
      <p style={{ fontWeight: "bold" }}>{name}</p>
      <p style={{ padding: "5px 0px" }}>{messageString}</p>
    </Box>
  );
};

export default Message;
