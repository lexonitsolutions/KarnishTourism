import "./tours.css";
import "./landing.css";
import ToursShell from "./components/ToursShell";

export default function ToursLayout({ children }) {
  return <ToursShell>{children}</ToursShell>;
}
