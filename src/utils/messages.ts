export const toMessageWithResponseObjects = (
  messages: any,
  setMessagesHandler: React.Dispatch<any>
) => {
  messages.forEach((message: any) => {
    const messageString = {
      id: message.id,
      message: `${message.user.email}: ${message.message}`,
    };
    const responseString = {
      id: message.response.id,
      message: `Assistant: ${message.response.message}`,
    };

    setMessagesHandler((prevState: any) => [
      ...prevState,
      messageString,
      responseString,
    ]);
  });
};

export const toMessageObjects = (
  messagesData: any,
  setMessagesHandler: React.Dispatch<any>
) => {
  const messages = messagesData.map((message: any) => ({
    id: message.id,
    message: `${message.user.email}: ${message.message}`,
  }));
  setMessagesHandler(messages);
};
