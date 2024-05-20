import { Box } from "@mui/material";
import { IMessageComponentProps } from "../../types/messages.types";

const Message = ({ messageObject }: IMessageComponentProps) => {
  const [name, messageString] = messageObject.message.split(": ");

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
