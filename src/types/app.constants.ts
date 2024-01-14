export type UserDataType = {
  name: string;
  password: string;
  email: string;
  id: string;
};

export type User = {
  name : string,
  email : string,
  id : string
}

export type LoginState = {
  email: string;
  password: string;
};

export type DashboardType = {
  noOfProjects: number;
  projects: BoardDataType[];
};

export type BoardDataType = {
  id: string;
  name: string | null;
  description: string | null;
  img: string | null;
  board: {
    columns : BoardColumnsDataType[],
    cards : CardDataType[],
  };
};

export type BoardColumnsDataType = {
  id: string;
  name: string | null;
  sequence: number;
};

export type CardDataType = {
  id: string;
  title: string;
  description: string;
  sequence: number;
  columnId : string;
  assignee : string | null;
  label : Label[];
};

export type Label = {
 text : string,
 color : string
}

export type Pagination = {
  offset: number;
  total: number;
  currCount: number;
};

export type AppReducerInitialStateType = {
  isLoggedIn: boolean;
  user: UserDataType | null;
  allUsersData: UserDataType[] | null;
  dashboard: DashboardType | null;
  newBoardInfo: BoardDataType | null;
  currBoardInfo : BoardDataType | null;
  boardId : string | null,
  cards : CardDataType[],
  columns : BoardColumnsDataType[],
};

export type ProjectStateType = {
  data: BoardDataType[];
  offset: number;
  totalCount: number;
  curr: number;
};
