import type {
  Response,
  PageableRequest,
  PageableResponse,
} from "../../utils/types";
import type {
  Client,
  ClientRequest,
  ClientFilter,
  ClientDropdown,
} from "./clientTypes";
import api from "../../config/axios";

const CLIENT = "/client";

export const clientService = {
  // POST /client/findAll
  findAll: async (
    request: PageableRequest<ClientFilter>,
  ): Promise<PageableResponse<Client>> => {
    const { data } = await api.post<Response<PageableResponse<Client>>>(
      `${CLIENT}/findAll`,
      request,
    );
    return data.responses;
  },

  // GET /client/find/{clientId}
  findByClientId: async (clientId: string): Promise<Client> => {
    const { data } = await api.get<Response<Client>>(
      `${CLIENT}/find/${clientId}`,
    );
    return data.responses;
  },

  // POST /client/save  -> returns success message (contains generated secret)
  save: async (request: ClientRequest): Promise<string> => {
    const { data } = await api.post<Response<string>>(
      `${CLIENT}/save`,
      request,
    );
    return data.responses;
  },

  // PUT /client/update/{clientId}
  update: async (clientId: string, request: ClientRequest): Promise<string> => {
    const { data } = await api.put<Response<string>>(
      `${CLIENT}/update/${clientId}`,
      request,
    );
    return data.responses;
  },

  // PATCH /client/toggleStatus/{clientId}
  toggleStatus: async (clientId: string): Promise<boolean> => {
    const { data } = await api.patch<Response<boolean>>(
      `${CLIENT}/toggleStatus/${clientId}`,
    );
    return data.responses;
  },

  // POST /client/regenerateSecret/{clientId} -> message with new secret
  regenerateSecret: async (clientId: string): Promise<string> => {
    const { data } = await api.post<Response<string>>(
      `${CLIENT}/regenerateSecret/${clientId}`,
    );
    return data.responses;
  },

  // GET /client/my-clients
  getMyClients: async (): Promise<ClientDropdown[]> => {
    const { data } = await api.get<Response<ClientDropdown[]>>(
      `${CLIENT}/my-clients`,
    );
    return data.responses;
  },
};
