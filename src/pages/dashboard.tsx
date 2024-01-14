import DashboardComp from "../components/dashboard";
import HomeLayout from "../components/layout/homeLayout";

interface Props {}
const Dashboard = (props: Props) => {
  return (
    <>
      <HomeLayout>
        <DashboardComp />
      </HomeLayout>
    </>
  );
};
export default Dashboard;
