import type {
  ResponseDto,
  PageableRequest,
  PageableResponse,
} from "../../utils/types";
import api from "../../config/axios";
import type { Role, RoleRequest, RoleFilter } from "./roleTypes";

const ROLE = "/role";

export const roleService = {
  // POST /role/findAll
  findAll: async (
    request: PageableRequest<RoleFilter>,
  ): Promise<PageableResponse<Role>> => {
    const { data } = await api.post<ResponseDto<PageableResponse<Role>>>(
      `${ROLE}/findAll`,
      request,
    );
    return data.responses;
  },

  // GET /role/find/{id}
  findById: async (id: number): Promise<Role> => {
    const { data } = await api.get<ResponseDto<Role>>(`${ROLE}/find/${id}`);
    return data.responses;
  },

  // POST /role/save
  save: async (request: RoleRequest): Promise<string> => {
    const { data } = await api.post<ResponseDto<string>>(
      `${ROLE}/save`,
      request,
    );
    return data.responses;
  },

  // PUT /role/update/{id}
  update: async (id: number, request: RoleRequest): Promise<string> => {
    const { data } = await api.put<ResponseDto<string>>(
      `${ROLE}/update/${id}`,
      request,
    );
    return data.responses;
  },

  // PATCH /role/toggleStatus/{id}
  toggleStatus: async (id: number): Promise<boolean> => {
    const { data } = await api.patch<ResponseDto<boolean>>(
      `${ROLE}/toggleStatus/${id}`,
    );
    return data.responses;
  },

  // DELETE /role/delete/{id}
  delete: async (id: number): Promise<string> => {
    const { data } = await api.delete<ResponseDto<string>>(
      `${ROLE}/delete/${id}`,
    );
    return data.responses;
  },

  // POST /role/{roleId}/addPermission/{permissionId}
  addPermission: async (
    roleId: number,
    permissionId: number,
  ): Promise<string> => {
    const { data } = await api.post<ResponseDto<string>>(
      `${ROLE}/${roleId}/addPermission/${permissionId}`,
    );
    return data.responses;
  },

  // DELETE /role/{roleId}/removePermission/{permissionId}
  removePermission: async (
    roleId: number,
    permissionId: number,
  ): Promise<string> => {
    const { data } = await api.delete<ResponseDto<string>>(
      `${ROLE}/${roleId}/removePermission/${permissionId}`,
    );
    return data.responses;
  },
};
