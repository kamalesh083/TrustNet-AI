// utils/formatTime.ts
export const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
