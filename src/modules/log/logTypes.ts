export type Log = {
  id: number;
  time: string;
  action: string;
  user: string;
  IpAddress: string;
  status: "Success" | "Failed";
  details: string;
};
