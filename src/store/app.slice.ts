import { createSlice } from "@reduxjs/toolkit";
import {
  AppReducerInitialStateType,
  BoardColumnsDataType,
  BoardDataType,
  CardDataType,
  UserDataType,
} from "../types/app.constants";
import {
  decryptData,
  getDashBoardDataFromLocalStorage,
  getUserToken,
  getUsersData,
  setDashBoardDataToLocalStorage,
} from "../utils";
import { v4 as uuidv4 } from "uuid";
import { BoardService } from "../service/board";

let initialState: AppReducerInitialStateType = {
  isLoggedIn: false,
  user: null,
  allUsersData: [],
  dashboard: null,
  newBoardInfo: null,
  currBoardInfo: null,
  boardId: null,
  columns: [],
  cards: [],
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    unauthorized: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.dashboard = null;

      localStorage.removeItem("token");
    },
    initialiseReduxFromLocalStorage: (state) => {
      const token = getUserToken();

      if (token) {
        let userData: UserDataType = decryptData(token);
        let allUserData: UserDataType[] = getUsersData();
        state.isLoggedIn = true;
        state.user = userData;

        state.dashboard = getDashBoardDataFromLocalStorage(userData.id);
        state.allUsersData = allUserData;
      }
    },
    createNewProject: (state) => {
      state.newBoardInfo = {
        id: uuidv4(),
        name: null,
        img: null,
        description: null,
        board: {
          columns: [],
          cards: [],
        },
      };
    },
    updateProjectInfo: (state, action) => {
      let payload = action.payload;
      let projectInfo = { ...state.newBoardInfo, ...payload };
      if (payload.compeleted) {
        if (state.dashboard == null) {
          state.dashboard = {
            noOfProjects: 1,
            projects: [projectInfo],
          };
        } else {
          let projects = JSON.parse(JSON.stringify(state.dashboard.projects));
          projects = [...projects, projectInfo];
          state.dashboard = {
            noOfProjects: projects.length,
            projects: projects,
          };
        }

        setDashBoardDataToLocalStorage(state.user?.id || "", state.dashboard);
        state.newBoardInfo = null;
      } else {
        state.newBoardInfo = projectInfo;
      }
    },
    deleteProjectInfo: (state, action) => {
      if (state.dashboard === null) return;

      let payload = action.payload;
      let boardId = payload.boardId;

      let projects = JSON.parse(JSON.stringify(state.dashboard.projects));
      projects = projects.filter(
        (project: BoardDataType) => project.id !== boardId
      );
      state.dashboard = {
        noOfProjects: projects.length,
        projects: projects,
      };
      setDashBoardDataToLocalStorage(state.user?.id || "", state.dashboard);
    },
    currentSelectBoard: (state, action) => {
      let boardId = action?.payload?.boardId;
      let boardInfo = action.payload.boardInfo;

      state.currBoardInfo = boardInfo;
      state.boardId = boardId;
      state.cards = boardInfo?.board.cards || [];
      state.columns = boardInfo?.board.columns || [];
    },
    resetCurrentBoard: (state) => {
      state.currBoardInfo = null;
      state.boardId = null;
      state.cards = [];
      state.columns = [];
    },
    addColumnToBoard: (state, action) => {
      const column = action.payload.column;
      if (!column || !state.boardId || !state.user || !state.dashboard) return;

      state.dashboard = BoardService.addColumnToBoard(
        state.boardId,
        action.payload.column,
        JSON.parse(JSON.stringify(state.user)),
        JSON.parse(JSON.stringify(state.dashboard))
      );

      state.currBoardInfo =
        state.dashboard?.projects?.find((proj) => proj.id == state.boardId) ||
        null;
      state.columns = state.currBoardInfo?.board.columns || [];
    },
    deleteColumnFromBoard: (state, action) => {
      const columnId = action.payload.columnId;

      if (!columnId || !state.boardId || !state.user?.id || !state.dashboard)
        return;

      state.dashboard =
        BoardService.deletColumnFromBoard(
          state.boardId,
          action.payload.columnId,
          JSON.parse(JSON.stringify(state.user)),
          JSON.parse(JSON.stringify(state.dashboard))
        ) || null;

      state.currBoardInfo =
        state.dashboard?.projects.find((proj) => proj.id === state.boardId) ||
        null;
      state.columns = state.currBoardInfo?.board.columns || [];
    },
    updateColumnFromBoard: (state, action) => {
      const column = action.payload.column;

      if (!column || !state.boardId || !state.user || !state.dashboard) return;

      state.dashboard = BoardService.updateColumnData(
        state.boardId,
        action.payload.column.id,
        action.payload.column,
        JSON.parse(JSON.stringify(state.user)),
        JSON.parse(JSON.stringify(state.dashboard))
      );
      state.currBoardInfo =
        state.dashboard?.projects.find((proj) => proj.id === state.boardId) ||
        null;
      state.columns = state.currBoardInfo?.board.columns || [];
    },
    addCard: (state, { payload }) => {
      const { columnId, cardId, cardTitle } = payload;

      if (!state.boardId || !columnId || !cardId) return;

      const sequence = state.cards.filter(
        (card) => card.columnId == columnId
      ).length;
      const card: CardDataType = {
        id: cardId,
        title: cardTitle,
        assignee: null,
        description: "",
        sequence: sequence,
        columnId,
        label: [],
      };

      state.dashboard = BoardService.addCardToBoard(
        state.boardId,
        card,
        JSON.parse(JSON.stringify(state.user)),
        JSON.parse(JSON.stringify(state.dashboard))
      );

      state.currBoardInfo = state.dashboard?.projects.find(
        (proj) => proj.id == state.boardId
      ) || null;
      state.cards = state.currBoardInfo?.board.cards || [];
    },
    updateCard: (state, { payload }) => {
      const card: CardDataType = payload.card;

      if (!state.boardId || !card || !card.columnId) return;

      state.dashboard = BoardService.updateCardInfoFromBoard(
        state.boardId,
        card,
        JSON.parse(JSON.stringify(state.user)),
        JSON.parse(JSON.stringify(state.dashboard))
      );

      state.currBoardInfo = state.dashboard?.projects.find(
        (proj) => proj.id == state.boardId
      ) || null;
      state.cards = state.currBoardInfo?.board.cards || [];
    },
    deleteCard: (state, { payload }) => {
      const cardId: string = payload.cardId;

      if (!state.boardId || !cardId) return;

      state.dashboard = BoardService.deleteCardFromBoard(
        state.boardId,
        cardId,
        JSON.parse(JSON.stringify(state.user)),
        JSON.parse(JSON.stringify(state.dashboard))
      );

      state.currBoardInfo = state.dashboard?.projects.find(
        (proj) => proj.id == state.boardId
      ) || null;
      state.cards = state.currBoardInfo?.board.cards || [];
    },
    updateColumnSequenceToLocalState: (state, { payload }) => {
      if (!payload.columns || !state.boardId || !state.user || !state.dashboard)
        return;

      state.dashboard = BoardService.updateAllColumns(
        state.boardId,
        payload.columns,
        JSON.parse(JSON.stringify(state.user)),
        JSON.parse(JSON.stringify(state.dashboard))
      );

      state.currBoardInfo = state.dashboard?.projects.find(
        (proj) => proj.id == state.boardId
      ) || null;
      state.columns = state.currBoardInfo?.board.columns || [];
    },
    updateCardSequenceToLocalState: (state, { payload }) => {
      if (!payload.cards || !state.boardId || !state.user || !state.dashboard)
        return;

      state.dashboard = BoardService.updateAllCards(
        state.boardId,
        payload.cards,
        JSON.parse(JSON.stringify(state.user)),
        JSON.parse(JSON.stringify(state.dashboard))
      );
      state.currBoardInfo = state.dashboard?.projects.find(
        (proj) => proj.id == state.boardId
      ) || null;
      state.cards = state.currBoardInfo?.board.cards || [];
    },
  },
});

export default appReducer.reducer;
export const {
  unauthorized,
  initialiseReduxFromLocalStorage,
  createNewProject,
  updateProjectInfo,
  deleteProjectInfo,
  currentSelectBoard,
  addColumnToBoard,
  deleteColumnFromBoard,
  updateColumnFromBoard,
  resetCurrentBoard,
  updateColumnSequenceToLocalState,
  updateCardSequenceToLocalState,
  addCard,
  updateCard,
  deleteCard,
} = appReducer.actions;
