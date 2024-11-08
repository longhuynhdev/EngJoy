import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Home
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/home/HomePage";

//Dashboard
import DashboardLayout from "./layouts/DashboardLayout";
import DashBoardPage from "./pages/dashboard/DashboardPage";
import AdminLessonsPage from "./pages/dashboard/lessons/AdminLessonPage";
import EditLessonPage from "./pages/dashboard/lessons/edit/EditLessonPage";
// Auth
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/auth/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashBoardPage />} />
          <Route path="lessons" element={<AdminLessonsPage />} />
          <Route path="lessons/edit/:id" element={<EditLessonPage />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
