export type SeriesItem = {
  name?: string;
  data: number[];
};

export type CategoryItem = string | number | { name: string; [key: string]: unknown };

export type ChartType = {
  title?: string;
  id?: string;
  className?: string;
  chartHeight?: string;
  chartName?: string;
  type?: "line" | "bar" | "area" | "pie" | "donut" | "radar" | "scatter";
  series: SeriesItem[];
  categories?: Array<string | number>;
  colors?: string[];
  dataLabels?: Array<{ text: string }>;
  labels?: string[];
  showLabels?: boolean;
  legend?: boolean;
  isHorizontal?: boolean;
  titleTransaction?: string;
  color?: string;
  callback?: (data: CallbackData) => void;
  yFormatter?: (val: number | string) => string;
};

export type CallbackData = {
  count?: number;
  amount?: number;
  date?: string;
};

export type OptionType = {
  value: string | number;
  label: string;
};
