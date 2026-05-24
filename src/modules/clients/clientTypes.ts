export type Client = {
  id: number;
  clientId: string;
  permissions: string[];
  scopes: string[];
  status: true | false;
  setting: string[];
};
