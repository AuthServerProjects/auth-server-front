import type {
  UserClient,
  CreateUser,
  UserClientFilter,
  AssignUserToClients,
} from "./userClientTypes";
import type {
  Response,
  PageableRequest,
  PageableResponse,
} from "../../../utils/types";
import api from "../../../config/axios";

const USER_CLIENT = "/user-client";

export const userClientService = {
  // POST /user-client/findAll
  findAll: async (
    request: PageableRequest<UserClientFilter>,
  ): Promise<PageableResponse<UserClient>> => {
    const { data } = await api.post<Response<PageableResponse<UserClient>>>(
      `${USER_CLIENT}/findAll`,
      request,
    );
    return data.responses;
  },

  // GET /user-client/find/{id}
  findById: async (id: number): Promise<UserClient> => {
    const { data } = await api.get<Response<UserClient>>(
      `${USER_CLIENT}/find/${id}`,
    );
    return data.responses;
  },

  // POST /user-client/save  (per-client assignment — client from header)
  save: async (request: CreateUser): Promise<UserClient> => {
    const { data } = await api.post<Response<UserClient>>(
      `${USER_CLIENT}/save`,
      request,
    );
    return data.responses;
  },

  // POST /user-client/assignToClients  (SUPER_ADMIN — general page, multi-client)
  assignToClients: async (
    request: AssignUserToClients,
  ): Promise<UserClient[]> => {
    const { data } = await api.post<Response<UserClient[]>>(
      `${USER_CLIENT}/assignToClients`,
      request,
    );
    return data.responses;
  },

  // PUT /user-client/update/{id}
  update: async (id: number, request: UserClient): Promise<string> => {
    const { data } = await api.put<Response<string>>(
      `${USER_CLIENT}/update/${id}`,
      request,
    );
    return data.responses;
  },

  // POST /user-client/resetPassword/{id}
  resetPassword: async (id: number): Promise<string> => {
    const { data } = await api.post<Response<string>>(
      `${USER_CLIENT}/resetPassword/${id}`,
    );
    return data.responses;
  },

  // PATCH /user-client/ban/{id}
  banUser: async (id: number): Promise<string> => {
    const { data } = await api.patch<Response<string>>(
      `${USER_CLIENT}/ban/${id}`,
    );
    return data.responses;
  },

  // PATCH /user-client/unban/{id}
  unbanUser: async (id: number): Promise<string> => {
    const { data } = await api.patch<Response<string>>(
      `${USER_CLIENT}/unban/${id}`,
    );
    return data.responses;
  },

  // DELETE /user-client/delete/{id}
  delete: async (id: number): Promise<string> => {
    const { data } = await api.delete<Response<string>>(
      `${USER_CLIENT}/delete/${id}`,
    );
    return data.responses;
  },
};
