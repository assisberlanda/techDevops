import './index.css'; // ou o nome do seu arquivo CSS principal
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
