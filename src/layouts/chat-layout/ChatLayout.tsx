import AppBarComponent from "../../components/app-bar/AppBarComponent";

const ChatLayout = ({ children }: any) => {
  return (
    <>
      <AppBarComponent />
      {children}
    </>
  );
};

export default ChatLayout;
