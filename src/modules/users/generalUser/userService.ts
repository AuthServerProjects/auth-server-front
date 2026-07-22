import type {
  Response,
  PageableRequest,
  PageableResponse,
} from "../../../utils/types";
import api from "../../../config/axios";
import type { User, UserRequest, UserFilter } from "./userTypes";

const USER = "/user";

export const userService = {
  // POST /user/findAll
  findAll: async (
    request: PageableRequest<UserFilter>,
  ): Promise<PageableResponse<User>> => {
    const { data } = await api.post<Response<PageableResponse<User>>>(
      `${USER}/findAll`,
      request,
    );
    return data.responses;
  },

  // GET /user/find/{id}
  findById: async (id: number): Promise<User> => {
    const { data } = await api.get<Response<User>>(`${USER}/find/${id}`);
    return data.responses;
  },

  // GET /user/findByUsername?username=
  findByUsername: async (username: string): Promise<User> => {
    const { data } = await api.get<Response<User>>(`${USER}/findByUsername`, {
      params: { username },
    });
    return data.responses;
  },

  // GET /user/existUsername?username=
  existUsername: async (username: string): Promise<boolean> => {
    const { data } = await api.get<Response<boolean>>(`${USER}/existUsername`, {
      params: { username },
    });
    return data.responses;
  },

  // GET /user/existPhoneNumber?phoneNumber=
  existPhoneNumber: async (phoneNumber: string): Promise<boolean> => {
    const { data } = await api.get<Response<boolean>>(
      `${USER}/existPhoneNumber`,
      { params: { phoneNumber } },
    );
    return data.responses;
  },

  // POST /user/save
  save: async (request: UserRequest): Promise<string> => {
    const { data } = await api.post<Response<string>>(`${USER}/save`, request);
    return data.responses;
  },

  // PUT /user/update/{id}
  update: async (id: number, request: UserRequest): Promise<string> => {
    const { data } = await api.put<Response<string>>(
      `${USER}/update/${id}`,
      request,
    );
    return data.responses;
  },

  // POST /user/resetPassword/{id}
  resetPassword: async (id: number): Promise<string> => {
    const { data } = await api.post<Response<string>>(
      `${USER}/resetPassword/${id}`,
    );
    return data.responses;
  },

  // DELETE /user/delete/{id}   (backend endpoint to be added)
  delete: async (id: number): Promise<string> => {
    const { data } = await api.delete<Response<string>>(`${USER}/delete/${id}`);
    return data.responses;
  },
};
