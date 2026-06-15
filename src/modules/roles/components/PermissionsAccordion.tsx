import Accordion, { type AccordionItem } from "../../../components/Accordion";

export type Permission = {
  key: string;
  description: string;
};

export type PermissionGroup = {
  name: string;
  permissions: Permission[];
};

type Props = {
  groups: PermissionGroup[];
  selected: string[];
  onChange: (keys: string[]) => void;
};

const PermissionsAccordion = ({ groups, selected, onChange }: Props) => {
  const togglePermission = (key: string) => {
    if (selected.includes(key)) {
      onChange(selected.filter((k) => k !== key));
    } else {
      onChange([...selected, key]);
    }
  };

  const toggleGroup = (group: PermissionGroup, allSelected: boolean) => {
    const groupKeys = group.permissions.map((p) => p.key);
    if (allSelected) {
      onChange(selected.filter((k) => !groupKeys.includes(k)));
    } else {
      const merged = new Set([...selected, ...groupKeys]);
      onChange([...merged]);
    }
  };

  const items: AccordionItem[] = groups.map((group) => {
    const selectedInGroup = group.permissions.filter((p) =>
      selected.includes(p.key),
    ).length;
    const allSelected = selectedInGroup === group.permissions.length;

    return {
      value: group.name,
      header: (
        <div className="flex items-center justify-between  w-full">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => {
                e.stopPropagation();
                toggleGroup(group, allSelected);
              }}
              onClick={(e) => e.stopPropagation()}
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
        <div className="flex flex-col">
          {group.permissions.map((p) => (
            <label
              key={p.key}
              className="flex items-center justify-start gap-3 p-3 border-t border-gray-50 cursor-pointer hover:bg-gray-30"
            >
              <input
                type="checkbox"
                checked={selected.includes(p.key)}
                onChange={() => togglePermission(p.key)}
                className="rounded-sm text-green-10 focus:ring-gray-30 cursor-pointer"
              />
              <div className="text-right">
                <p className="text-sm text-black-100">{p.key}</p>
                <p className="text-xs text-gray-70">{p.description}</p>
              </div>
            </label>
          ))}
        </div>
      ),
    };
  });

  return <Accordion items={items} />;
};

export default PermissionsAccordion;
