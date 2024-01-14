import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector as useSelector } from "../store/hook";

interface Props {
  children: JSX.Element | any;
}
const ProtectedRoute = ({ children }: Props) => {
  let location = useLocation();
  const isLoggedIn = useSelector((state) => state.appReducer.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
