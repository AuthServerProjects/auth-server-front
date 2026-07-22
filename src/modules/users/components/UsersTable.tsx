import { useState } from "react";

import type { UserRow } from "../userRow";
import { getColumns } from "./UserTableColumns";
import { userService } from "../generalUser/userService";
import Table, { type SortState } from "../../../components/tables";
import { userClientService } from "../userClient/userClientService";

type Props = {
  data: UserRow[];
  total: number;
  loading: boolean;
  page: number;
  isFromClient: boolean;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
};

const UsersTable = ({
  data,
  total,
  loading,
  page,
  isFromClient,
  onPageChange,
  onRefresh,
}: Props) => {
  const [sortBy, setSortBy] = useState<SortState>();

  // general: enable/disable via user.update(isEnabled)
  // per-client: ban/unban the membership
  const handleStatusChange = async (row: UserRow, checked: boolean) => {
    try {
      if (isFromClient) {
        if (checked) await userClientService.unbanUser(row.id);
        else await userClientService.banUser(row.id);
      } else {
        await userService.update(row.id, {
          id: row.id,
          username: row.username,
          phoneNumber: row.phoneNumber,
          isEnabled: checked,
        });
      }
      onRefresh();
    } catch (err) {
      console.error("toggle failed", err);
    }
  };

  const columns = getColumns(handleStatusChange, isFromClient, onRefresh);

  return (
    <Table<UserRow>
      columns={columns}
      data={data}
      rowKey="id"
      striped
      loading={loading}
      sortBy={sortBy}
      onSortChange={setSortBy}
      pagination={{
        page,
        pageSize: 10,
        total,
        onChange: onPageChange,
        showSizeChanger: true,
        onPageSizeChange: (s) => console.log(s),
      }}
    />
  );
};

export default UsersTable;
