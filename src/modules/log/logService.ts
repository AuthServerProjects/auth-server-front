import type {
  Response,
  PageableRequest,
  PageableResponse,
} from "../../utils/types";
import api from "../../config/axios";
import type { Log, LogFilter } from "./logTypes";

const AUDIT = "/audit";

export const logService = {
  // POST /audit/findAll
  findAll: async (
    request: PageableRequest<LogFilter>,
  ): Promise<PageableResponse<Log>> => {
    const { data } = await api.post<Response<PageableResponse<Log>>>(
      `${AUDIT}/findAll`,
      request,
    );
    return data.responses;
  },
};
