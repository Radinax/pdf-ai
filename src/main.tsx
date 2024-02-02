import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "tailwindcss/tailwind.css";
import App from "./app.tsx";

const rootNode = document.getElementById("root")!;

rootNode &&
  createRoot(rootNode).render(
    <StrictMode>
      <App />
      <Toaster />
    </StrictMode>
  );
