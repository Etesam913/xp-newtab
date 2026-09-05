import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureYouTubeEmbeds } from "./functions/extension";

async function start() {
  try {
    await configureYouTubeEmbeds();
  } catch (error) {
    console.warn(
      "YouTube embed configuration failed. Videos can still be opened on YouTube.",
      error,
    );
  }
  const root = document.getElementById("root");
  if (!root) throw new Error("Missing application root");
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
void start();
