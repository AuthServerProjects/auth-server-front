import type {
  Response,
  PageableRequest,
  PageableResponse,
} from "../../utils/types";
import type {
  Permission,
  PermissionRequest,
  PermissionFilter,
} from "./permissionTypes";
import api from "../../config/axios";

const PERMISSION = "/permission";

export const permissionService = {
  // POST /permission/findAll
  findAll: async (
    request: PageableRequest<PermissionFilter>,
  ): Promise<PageableResponse<Permission>> => {
    const { data } = await api.post<Response<PageableResponse<Permission>>>(
      `${PERMISSION}/findAll`,
      request,
    );
    return data.responses;
  },

  // GET /permission/find/{id}
  findById: async (id: number): Promise<Permission> => {
    const { data } = await api.get<Response<Permission>>(
      `${PERMISSION}/find/${id}`,
    );
    return data.responses;
  },

  // POST /permission/save
  save: async (request: PermissionRequest): Promise<string> => {
    const { data } = await api.post<Response<string>>(
      `${PERMISSION}/save`,
      request,
    );
    return data.responses;
  },

  // PUT /permission/update/{id}
  update: async (id: number, request: PermissionRequest): Promise<string> => {
    const { data } = await api.put<Response<string>>(
      `${PERMISSION}/update/${id}`,
      request,
    );
    return data.responses;
  },

  // PATCH /permission/toggleStatus/{id}
  toggleStatus: async (id: number): Promise<boolean> => {
    const { data } = await api.patch<Response<boolean>>(
      `${PERMISSION}/toggleStatus/${id}`,
    );
    return data.responses;
  },

  // DELETE /permission/delete/{id}
  delete: async (id: number): Promise<string> => {
    const { data } = await api.delete<Response<string>>(
      `${PERMISSION}/delete/${id}`,
    );
    return data.responses;
  },
};
