import api from "../../config/axios";
import type { Response } from "../../utils/types";
import type { ClientDropdown } from "./clientTypes";

const CLIENT = "/client";

export const clientService = {
  // GET /client/my-clients
  getMyClients: async (): Promise<ClientDropdown[]> => {
    const { data } = await api.get<Response<ClientDropdown[]>>(
      `${CLIENT}/my-clients`,
    );
    return data.responses;
  },
};
