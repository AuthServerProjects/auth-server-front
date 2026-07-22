import type {
  Response,
  PageableRequest,
  PageableResponse,
} from "../../../utils/types";
import api from "../../../config/axios";
import type { UserRole, UserRoleFilter } from "./userRoleTypes";

const USER_ROLE = "/user-role";

export const userRoleService = {
  // POST /user-role/assign?userClientId=&roleId=
  assign: async (userClientId: number, roleId: number): Promise<UserRole> => {
    const { data } = await api.post<Response<UserRole>>(
      `${USER_ROLE}/assign`,
      null,
      { params: { userClientId, roleId } },
    );
    return data.responses;
  },

  // DELETE /user-role/unassign?userClientId=&roleId=
  unassign: async (userClientId: number, roleId: number): Promise<string> => {
    const { data } = await api.delete<Response<string>>(
      `${USER_ROLE}/unassign`,
      { params: { userClientId, roleId } },
    );
    return data.responses;
  },

  // GET /user-role/findByUserClientId/{userClientId}
  findByUserClientId: async (userClientId: number): Promise<UserRole[]> => {
    const { data } = await api.get<Response<UserRole[]>>(
      `${USER_ROLE}/findByUserClientId/${userClientId}`,
    );
    return data.responses;
  },

  // GET /user-role/findByRoleId/{roleId}
  findByRoleId: async (roleId: number): Promise<UserRole[]> => {
    const { data } = await api.get<Response<UserRole[]>>(
      `${USER_ROLE}/findByRoleId/${roleId}`,
    );
    return data.responses;
  },

  // POST /user-role/findAll
  findAll: async (
    request: PageableRequest<UserRoleFilter>,
  ): Promise<PageableResponse<UserRole>> => {
    const { data } = await api.post<Response<PageableResponse<UserRole>>>(
      `${USER_ROLE}/findAll`,
      request,
    );
    return data.responses;
  },

  // GET /user-role/find/{id}
  findById: async (id: number): Promise<UserRole> => {
    const { data } = await api.get<Response<UserRole>>(
      `${USER_ROLE}/find/${id}`,
    );
    return data.responses;
  },

  // DELETE /user-role/delete/{id}
  delete: async (id: number): Promise<string> => {
    const { data } = await api.delete<Response<string>>(
      `${USER_ROLE}/delete/${id}`,
    );
    return data.responses;
  },
};
