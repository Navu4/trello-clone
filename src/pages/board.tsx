import { useParams } from "react-router-dom";
import Header from "../components/header";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../store/hook";

import { useEffect } from "react";
import { DashboardService } from "../service/dashboard";
import { Box } from "@chakra-ui/react";
import BoardSection from "../components/board";
import { currentSelectBoard, resetCurrentBoard } from "../store/app.slice";

interface Props {}
const Board = ({}: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const dashboardInfo = useSelector((state) => state.appReducer.dashboard);
  const boardInfo = useSelector((state) => state.appReducer.currBoardInfo);

  useEffect(() => {
    const { boardId } = params;
    if (dashboardInfo) {
      const proj = DashboardService.fetchProjectData(
        dashboardInfo,
        boardId || ""
      );
      if (proj && boardId) {
        dispatch(currentSelectBoard({ boardId, boardInfo: proj }));
      }
    }
  }, [dashboardInfo]);

  useEffect(() => {
    return () => {
      dispatch(resetCurrentBoard());
    };
  }, []);
  return (
    <Box
      backgroundPosition="center"
      h="100vh"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Header
        heading={boardInfo?.name || ""}
        isBoardHeader={true}
        logoUrl="https://trello.com/assets/75d96a8b741cb5310663.png"
      />
      <BoardSection />
    </Box>
  );
};
export default Board;
