import {
  DashboardType,
  BoardDataType,
  ProjectStateType,
} from "../types/app.constants";

export const DashboardService = {
  fetchDashboardData: (
    dashboardInfo: DashboardType | null,
    offset: number = 9,
    curr: number = 0
  ): ProjectStateType => {
    return {
      data: dashboardInfo?.projects.slice(curr, offset + curr) || [],
      offset,
      curr: curr + offset || 0,
      totalCount: dashboardInfo?.noOfProjects || 0,
    };
  },
  fetchProjectData: (
    dashboardInfo: DashboardType | null,
    boardId: string
  ): BoardDataType | null => {
    return (
      dashboardInfo?.projects?.find((project) => project.id === boardId) ||
      null
    );
  },
};
