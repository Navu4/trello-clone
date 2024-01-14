import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAppSelector as useSelector } from "../../store/hook";
import { BoardDataType, ProjectStateType } from "../../types/app.constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/app.constants";
import { useEffect, useState } from "react";
import { DashboardService } from "../../service/dashboard";

interface Props {}
const DashboardComp = (props: Props) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectStateType>({
    data: [],
    offset: 9,
    totalCount: 0,
    curr: 0,
  });
  const dashboardInfo = useSelector((state) => state.appReducer.dashboard);

  const redirectToCreateDashboard = () =>
    navigate(`${ROUTES.CREATE_FIRST_DASHBOARD}?flag=true`);

  const loadMoreData = () => {
    const projData = DashboardService.fetchDashboardData(
      dashboardInfo,
      projects.offset,
      projects.curr
    );
    setProjects((prevData) => {
      return {
        offset: projData.offset,
        curr: projData.curr,
        totalCount: projData.totalCount,
        data: [...prevData.data, ...projData.data],
      };
    });
  };

  useEffect(() => {
    if (dashboardInfo) {
      const projData = DashboardService.fetchDashboardData(dashboardInfo);
      setProjects((prevData) => {
        return {
          offset: projData.offset,
          curr: projData.curr,
          totalCount: projData.totalCount,
          data: [...prevData.data, ...projData.data],
        };
      });
    }
  }, [dashboardInfo]);
  return (
    <Flex w={"100vw"} h="100vh" flexDir={"column"} px="2rem">
      <Flex align={"center"} justify={"space-between"}>
        <Heading my={"1rem"}>Your Boards</Heading>
        {dashboardInfo?.noOfProjects && dashboardInfo.noOfProjects >= 4 && (
          <Button onClick={redirectToCreateDashboard} variant={"outline"}>
            + Create Project
          </Button>
        )}
      </Flex>
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
        ]}
        gap={6}
      >
        {projects?.data?.map((project) => {
          return (
            <GridItem key={project.id} w="100%">
              <DashboardProjectCard project={project} />
            </GridItem>
          );
        })}
        {projects?.totalCount < projects.offset && (
          <GridItem key={"createproject"} w="100%">
            <Card
              h={"200px"}
              w="full"
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              display="flex"
              align={"center"}
              justify={"center"}
              cursor={"pointer"}
              onClick={redirectToCreateDashboard}
            >
              <Text as="h3" fontSize={"1.6rem"}>
                + Create New Project
              </Text>
            </Card>
          </GridItem>
        )}
        {projects.curr < projects.totalCount && (
          <Button mb="1rem" onClick={loadMoreData}>
            Load More
          </Button>
        )}
      </Grid>
    </Flex>
  );
};
export default DashboardComp;

const DashboardProjectCard = ({ project }: { project: BoardDataType }) => {
  const navigate = useNavigate();
  const onOpenProject = () => {
    navigate(`${ROUTES.BOARD}/${project.id}`);
  };
  return (
    <Card
      key={project.id}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      id={project.id}
      className="boards-cards"
    >
      <Image
        objectFit="cover"
        h="200px"
        w={["full", "200px", "200px"]}
        src={
          project?.img
            ? project.img
            : "https://source.unsplash.com/random"
        }
        alt="project cover image"
      />

      <Stack flex={1}>
        <CardBody>
          <Heading size="md">{project.name}</Heading>

          <Text h={"2rem"} py="1">
            {project.description}
          </Text>
        </CardBody>

        <CardFooter display={"flex"} justify={"flex-end"}>
          <Button data-btn={`${project.id}`} onClick={onOpenProject} variant="solid" colorScheme="blue">
            Open Project
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
