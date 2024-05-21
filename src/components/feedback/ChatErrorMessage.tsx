import { Alert, Snackbar } from "@mui/material";
import { EAlertSeverity } from "../../types/common";
import { IChatErrorMessageProps } from "../../types/chat.types";

export const ChatErrorMessage = ({
  message,
  openState,
  onClose,
}: IChatErrorMessageProps) => {
  return (
    <Snackbar
      open={openState}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={EAlertSeverity.error} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
