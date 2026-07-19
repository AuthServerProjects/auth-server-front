import type { BaseFilter } from "../../utils/types";

export type AuditAction = string;

export type Log = {
  id: number;
  action: AuditAction;
  username: string;
  clientId: number | null;
  clientName: string | null;
  ipAddress: string;
  userAgent: string;
  details: string;
  success: boolean;
  createdAt: string; // Instant -> ISO string
};

export interface LogFilter extends BaseFilter {
  action?: AuditAction;
  username?: string;
  success?: boolean;
  fromDate?: string; // ISO
  toDate?: string; // ISO
  isEnabled?: boolean;
}
