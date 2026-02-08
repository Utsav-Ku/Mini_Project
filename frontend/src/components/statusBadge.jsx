export default function StatusBadge({ status }) {
  const base =
    "px-2 py-1 rounded text-white text-sm font-medium";
  if (status === "pending")
    return (
      <span className={`${base} bg-yellow-500`}>
        Pending
      </span>
    );

  if (status === "accepted")
    return (
      <span className={`${base} bg-green-600`}>
        Accepted
      </span>
    );

  if (status === "rejected")
    return (
      <span className={`${base} bg-red-600`}>
        Rejected
      </span>
    );

  return null;
}