import "./authFormLayout.scss";

const AuthFormLayout = ({ children, heading, subHeading }: any) => {
  return (
    <div className="authPageContainer">
      <div className="authFormContainer">
        <div className="authPageContent">
          <h3>Dual View Chat Application</h3>
          <div className="authPageInfo">
            {heading && <h2>{heading}</h2>}
            {subHeading && <p>{subHeading}</p>}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
