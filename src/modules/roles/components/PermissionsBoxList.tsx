import BoxList, { type BoxListItem } from "../../../components/Box/BoxList";
import type {
  Permission,
  PermissionGroup,
} from "../../permissions/permissionTypes";

type Props = {
  groups: PermissionGroup[];
  selected: Permission[];
  onChange: (permissions: Permission[]) => void;
};

const PermissionsBoxList = ({ groups, selected, onChange }: Props) => {
  const isSelected = (permission: Permission) =>
    selected.some((p) => p.id === permission.id);

  const togglePermission = (permission: Permission) => {
    if (isSelected(permission)) {
      onChange(selected.filter((p) => p.id !== permission.id));
    } else {
      onChange([...selected, permission]);
    }
  };

  const toggleGroup = (group: PermissionGroup, allSelected: boolean) => {
    const groupIds = new Set(group.permissions.map((p) => p.id));

    if (allSelected) {
      onChange(selected.filter((p) => !groupIds.has(p.id)));
    } else {
      const missing = group.permissions.filter((p) => !isSelected(p));
      onChange([...selected, ...missing]);
    }
  };

  const items: BoxListItem[] = groups.map((group) => {
    const selectedInGroup = group.permissions.filter(isSelected).length;
    const allSelected =
      group.permissions.length > 0 &&
      selectedInGroup === group.permissions.length;

    return {
      value: group.name,
      header: (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => toggleGroup(group, allSelected)}
              className="rounded-sm text-green-10 focus:ring-gray-30 cursor-pointer"
            />
            <span className="text-black-100">{group.name}</span>
          </div>
          <span className="text-xs text-gray-70 ml-3">
            {selectedInGroup}/{group.permissions.length}
          </span>
        </div>
      ),
      content: (
        <>
          {group.permissions.map((permission) => (
            <label
              key={permission.id}
              className="flex items-center justify-start gap-3 p-3 border-t border-gray-50 cursor-pointer hover:bg-gray-30"
            >
              <input
                type="checkbox"
                checked={isSelected(permission)}
                onChange={() => togglePermission(permission)}
                className="rounded-sm text-green-10 focus:ring-gray-30 cursor-pointer"
              />
              <div className="text-right">
                <p className="text-sm text-black-100">{permission.name}</p>
                <p className="text-xs text-gray-70">{permission.description}</p>
              </div>
            </label>
          ))}
        </>
      ),
    };
  });

  return (
    <BoxList
      items={items}
      layout="grid"
      bodyClassName="flex flex-col max-h-60 overflow-y-auto
        scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent
        hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
    />
  );
};

export default PermissionsBoxList;
