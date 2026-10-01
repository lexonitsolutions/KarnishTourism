export default function StatusBadge({ value = "Draft" }) {
  const key = value.toLowerCase().replaceAll(" ", "-");
  return <span className={`status-badge status-${key}`}>{value}</span>;
}
