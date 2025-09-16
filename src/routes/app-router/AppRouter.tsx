import { BrowserRouter, Routes, Route } from "react-router";
import App from "../../App";
import { TasksPage } from "../../pages/tasks-page";
import { routes } from "../../constants/routes";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.BASE} element={<App />} />
      <Route path={routes.TASKS} element={<TasksPage />} />
    </Routes>
  </BrowserRouter>
);
