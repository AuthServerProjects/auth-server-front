import type {
  Response,
  PageableRequest,
  PageableResponse,
} from "../../utils/types";
import api from "../../config/axios";
import type { Session, SessionFilter } from "./sessionTypes";

const SESSIONS = "/sessions";

export const sessionService = {
  // POST /sessions/findAll
  findAll: async (
    request: PageableRequest<SessionFilter>,
  ): Promise<PageableResponse<Session>> => {
    const { data } = await api.post<Response<PageableResponse<Session>>>(
      `${SESSIONS}/findAll`,
      request,
    );
    return data.responses;
  },

  // GET /sessions/findByUsername/{username}
  findByUsername: async (username: string): Promise<Session[]> => {
    const { data } = await api.get<Response<Session[]>>(
      `${SESSIONS}/findByUsername/${username}`,
    );
    return data.responses;
  },

  // DELETE /sessions/revoke/{authorizationId}
  revoke: async (authorizationId: string): Promise<string> => {
    const { data } = await api.delete<Response<string>>(
      `${SESSIONS}/revoke/${authorizationId}`,
    );
    return data.responses;
  },

  // DELETE /sessions/revokeByUsername/{username}
  revokeByUsername: async (username: string): Promise<string> => {
    const { data } = await api.delete<Response<string>>(
      `${SESSIONS}/revokeByUsername/${username}`,
    );
    return data.responses;
  },
};
