import { CircularProgress } from "@mui/material";
import "./loadingPage.scss";

const LoadingPage = () => {
  return (
    <div className="loadingContainer">
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;
