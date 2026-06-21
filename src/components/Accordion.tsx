import * as RadixAccordion from "@radix-ui/react-accordion";
import { LuChevronDown } from "react-icons/lu";
import { type ReactNode } from "react";

export type AccordionItem = {
  value: string;
  header: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  defaultOpenAll?: boolean;
  layout?: "stack" | "grid";
  className?: string;
};

const Accordion = ({
  items,
  type = "multiple",
  defaultValue,
  defaultOpenAll = false,
  layout = "stack",
  className,
}: AccordionProps) => {
  const initialOpen = defaultOpenAll ? items.map((i) => i.value) : defaultValue;
  const layoutClass =
    layout === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      : "flex flex-col gap-4";
  return (
    <RadixAccordion.Root
      type={type as "multiple"}
      defaultValue={initialOpen as string[]}
      className={`${layoutClass} ${className ?? ""}`}
    >
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.value}
          value={item.value}
          className="border border-gray-50 rounded-lg overflow-hidden"
        >
          <RadixAccordion.Header className="flex">
            <RadixAccordion.Trigger className="group flex items-center justify-between w-full p-3 cursor-pointer transition-colors bg-gray-30">
              <div className="flex-1">{item.header}</div>
              <LuChevronDown className="text-gray-70 transition-transform group-data-[state=open]:rotate-180" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>

          <RadixAccordion.Content
            className="flex flex-col data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up max-h-46 overflow-y-scroll 
            scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
          >
            <div className="border-t border-gray-50">{item.content}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};

export default Accordion;
