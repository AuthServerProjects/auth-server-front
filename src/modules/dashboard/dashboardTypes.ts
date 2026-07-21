export type AuditAction = string;

// TopFailedIpDto
export type TopFailedIp = {
  ipAddress: string;
  failedCount: number;
};

// RecentActivityDto
export type RecentActivity = {
  action: AuditAction;
  username: string;
  clientName: string;
  ipAddress: string;
  success: boolean;
  createdAt: string; // Instant → ISO string
};

// GET /dashboard/stats  (SUPER_ADMIN / general)
export type DashboardStats = {
  failedOtpLastHour: number;
  failedOtpToday: number;
  successfulLoginsToday: number;
  sessionsRevokedToday: number;
  topFailedIps: TopFailedIp[];
  recentActivity: RecentActivity[];
};

// GET /dashboard/client-stats  (per-client)
export type ClientDashboardStats = {
  activeUsers: number;
  loginsToday: number;
  failedLoginsToday: number;
  sessionsRevokedToday: number;
  recentActivity: RecentActivity[];
};
