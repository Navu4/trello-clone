import {
  BoardColumnsDataType,
  BoardDataType,
  CardDataType,
  DashboardType,
  UserDataType,
} from "../types/app.constants";
import { setDashBoardDataToLocalStorage } from "../utils";

type UpdateFunction = (
  proj: BoardDataType,
  boardId: string,
  user: UserDataType,
  dashboard: DashboardType
) => BoardDataType;

const updateDashboard = (
  boardId: string,
  updateFunction: UpdateFunction,
  user: UserDataType,
  dashboard: DashboardType
): DashboardType => {
  if (!user?.id || !dashboard) return dashboard;

  const updatedProjects = dashboard?.noOfProjects
    ? dashboard.projects.map((proj) =>
        proj.id === boardId ? updateFunction(proj, boardId, user, dashboard) : proj
      )
    : [];

  const updatedDashboard: DashboardType = {
    ...dashboard,
    projects: updatedProjects,
  };

  setDashBoardDataToLocalStorage(user.id, updatedDashboard);

  return updatedDashboard;
};

export const BoardService = {
  addColumnToBoard: (
    boardId: string,
    column: BoardColumnsDataType,
    user: UserDataType,
    dashboard: DashboardType
  ) =>
    updateDashboard(boardId, (proj) => ({
      ...proj,
      board: { ...proj.board, columns: [...proj.board.columns, column] },
    }), user, dashboard),

  updateColumnData: (
    boardId: string,
    columnId: string,
    columnData: BoardColumnsDataType,
    user: UserDataType,
    dashboard: DashboardType
  ) =>
    updateDashboard(boardId, (proj) => ({
      ...proj,
      board: {
        ...proj.board,
        columns: proj.board.columns.map((col) => (col.id === columnId ? columnData : col)),
      },
    }), user, dashboard),

  deleteColumnFromBoard: (
    boardId: string,
    columnId: string,
    user: UserDataType,
    dashboard: DashboardType
  ) =>
    updateDashboard(boardId, (proj) => ({
      ...proj,
      board: {
        ...proj.board,
        columns: proj.board.columns.filter((col) => col.id !== columnId),
      },
    }), user, dashboard),

  updateAllColumns: (
    boardId: string,
    columns: BoardColumnsDataType[],
    user: UserDataType,
    dashboard: DashboardType
  ) =>
    updateDashboard(boardId, (proj) => ({
      ...proj,
      board: { ...proj.board, columns },
    }), user, dashboard),

  updateAllCards: (
    boardId: string,
    cards: CardDataType[],
    user: UserDataType,
    dashboard: DashboardType
  ) =>
    updateDashboard(boardId, (proj) => ({
      ...proj,
      board: { ...proj.board, cards },
    }), user, dashboard),

  addCardToBoard: (
    boardId: string,
    card: CardDataType,
    user: UserDataType,
    dashboard: DashboardType
  ) =>
    updateDashboard(boardId, (proj) => ({
      ...proj,
      board: { ...proj.board, cards: [...proj.board.cards, card] },
    }), user, dashboard),

  updateCardInfoFromBoard: (
    boardId: string,
    card: CardDataType,
    user: UserDataType,
    dashboard: DashboardType
  ) =>
    updateDashboard(boardId, (proj) => ({
      ...proj,
      board: {
        ...proj.board,
        cards: proj.board.cards.map((cd) => (cd.id === card.id ? card : cd)),
      },
    }), user, dashboard),

  deleteCardFromBoard: (
    boardId: string,
    cardId: string,
    user: UserDataType,
    dashboard: DashboardType
  ) =>
    updateDashboard(boardId, (proj) => ({
      ...proj,
      board: {
        ...proj.board,
        cards: proj.board.cards.filter((cd) => cd.id !== cardId),
      },
    }), user, dashboard),
  deletColumnFromBoard: (
      boardId: string,
      columnId: string,
      user: UserDataType,
      dashboard: DashboardType
    ) => {
      if (!user?.id || !dashboard) return;
  
      let projects = dashboard?.noOfProjects
        ? dashboard.projects.map((proj) => {
            if (boardId == proj.id)
              proj.board.columns = proj.board.columns.filter(
                (col) => columnId !== col.id
              );
            return proj;
          })
        : [];
  
      dashboard.projects = projects;
      setDashBoardDataToLocalStorage(user.id, dashboard);
      return dashboard;
    },
  
};
