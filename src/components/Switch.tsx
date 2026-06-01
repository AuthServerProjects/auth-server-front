import * as SwitchPrimitive from "@radix-ui/react-switch";

type SwitchProps = {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
};

const Switch = ({
  checked,
  onCheckedChange,
  label,
  disabled,
  id,
}: SwitchProps) => {
  const switchId = id || (label ? `switch-${label}` : undefined);

  return (
    <div
      className="inline-flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <SwitchPrimitive.Root
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="relative h-[21px] w-[35px] cursor-pointer rounded-full bg-gray-50 
        shadow-gray-70 outline-none data-[state=checked]:bg-green-10"
      >
        <SwitchPrimitive.Thumb
          className="block size-[17px] translate-x-0.5 rounded-full bg-white transition-transform 
          duration-500 will-change-transform data-[state=checked]:-translate-x-[2.5px] data-[state=unchecked]:-translate-x-[16px]"
        />
      </SwitchPrimitive.Root>
      {label && (
        <label
          htmlFor={switchId}
          className="text-sm text-gray-700 select-none w-8"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch;
