import { Flex, VStack } from "@chakra-ui/react";
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../store/hook";
import { ROUTES } from "../utils/app.constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createNewProject } from "../store/app.slice";
import {
  DashboardFirstInformation,
  DashboardIntroSection,
} from "../components/dashboard/firstDashboardComp";
import { useEffect } from "react";
import SideBanner from "../components/layout/sidebanner";
import Header from "../components/header";

interface Props {}
const CreateFirstDashboard = ({}: Props) => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const flag = searchParams.get("flag");
  const dispatch = useDispatch();
  const dashboardInfo = useSelector((state) => state.appReducer.dashboard);
  const newBoardInfo = useSelector(
    (state) => state.appReducer.newBoardInfo
  );

  const createNewDashboardProject = () => {
    dispatch(createNewProject());
    navigator(ROUTES.FIRST_DASHBOARD_INFO);
  };

  const getContentComp = () => {
    if (newBoardInfo) {
      if (newBoardInfo.name === null) {
        return <DashboardFirstInformation />;
      } else {
        navigator(ROUTES.FIRST_DASHBOARD_INFO);
        return;
      }
    } else {
      if (flag) {
        createNewDashboardProject();
        return <></>;
      }
      return (
        <DashboardIntroSection onSubmitHandler={createNewDashboardProject} />
      );
    }
  };

  useEffect(() => {
    if (
      !flag &&
      dashboardInfo &&
      dashboardInfo.noOfProjects &&
      dashboardInfo.noOfProjects > 0
    ) {
      navigator(ROUTES.DASHBOARD);
    }
  }, []);
  return (
    <>
      <Header isBoardHeader={true} />
      <Flex w={"full"} height="100vh">
        <Flex
          bgColor={"#0E2431"}
          align="center"
          justify="center"
          height={"full"}
          w={["full", "full", "50rem", "50rem"]}
          px="2rem"
          color={"white"}
        >
          <VStack w="full" p="2rem" align={"flex-start"} spacing={"5"}>
            {getContentComp()}
          </VStack>
        </Flex>
        <SideBanner imgUrl="https://trello.com/assets/a7fb768ffd0181cbfc63.svg" />
      </Flex>
    </>
  );
};
export default CreateFirstDashboard;
