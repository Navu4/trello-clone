import DashboardComp from "../components/dashboard";
import HomeLayout from "../components/layout/homeLayout";

interface Props {}
const Dashboard = ({}: Props) => {
  return (
    <>
      <HomeLayout>
        <DashboardComp />
      </HomeLayout>
    </>
  );
};
export default Dashboard;
