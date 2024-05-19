import AppBarComponent from "../../components/app-bar/AppBarComponent";

const ChatLayout = ({ children }: any) => {
  return (
    <div>
      <AppBarComponent />
      {children}
    </div>
  );
};

export default ChatLayout;
