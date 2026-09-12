import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CareerContextProvider } from "./context/MyCareer.jsx";

createRoot(document.getElementById("root")).render(
  <CareerContextProvider>
    <App />
  </CareerContextProvider>,
);
