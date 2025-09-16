import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./routes/app-router/AppRouter.tsx";

import "./index.css";
import { tasksStore } from "./stores/tasks.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={tasksStore}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
