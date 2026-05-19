export const renderDate = (value: unknown) => {
  if (!value) return "-";
  return new Date(value as string).toLocaleString("fa-IR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};
