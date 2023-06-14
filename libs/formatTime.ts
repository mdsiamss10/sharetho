export default function formatTwitterTime(targetTime: Date): string {
  const timeDifference = Math.floor(
    (new Date().getTime() - new Date(targetTime).getTime()) / 1000
  );

  if (timeDifference < 60) return "Just now";
  if (timeDifference < 3600) return `${Math.floor(timeDifference / 60)}min`;
  if (timeDifference < 86400) return `${Math.floor(timeDifference / 3600)}h`;
  return `${Math.floor(timeDifference / 86400)}d`;
}
