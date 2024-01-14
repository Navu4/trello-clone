import { useEffect } from "react";
import { useAppSelector as useSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/app.constants";

interface Props {}
const Home = (props: Props) => {
  const navigate = useNavigate();
  const dashboardInfo = useSelector((state) => state.appReducer.dashboard);

  useEffect(() => {
    if (!dashboardInfo) {
      navigate(ROUTES.CREATE_FIRST_DASHBOARD);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  }, []);

  return <div>Home</div>;
};
export default Home;
