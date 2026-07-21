import api from "../../config/axios";

import type { Response } from "../../utils/types";
import type { DashboardStats, ClientDashboardStats } from "./dashboardTypes";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } =
      await api.get<Response<DashboardStats>>("/dashboard/stats");
    return data.responses;
  },

  getClientStats: async (): Promise<ClientDashboardStats> => {
    const { data } = await api.get<Response<ClientDashboardStats>>(
      "/dashboard/client-stats",
    );
    return data.responses;
  },
};
