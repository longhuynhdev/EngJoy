import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Home
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/home/HomePage";

//Dashboard
import DashboardLayout from "./layouts/DashboardLayout";
import DashBoardPage from "./pages/dashboard/DashboardPage";
// Dashboard - Lessons
import AdminLessonsPage from "./pages/dashboard/lessons/AdminLessonPage";
import AddLessonPage from "./pages/dashboard/lessons/AddLessonPage";
import EditLessonPage from "./pages/dashboard/lessons/EditLessonPage";
// Dashboard - Categories
import CategoriesManagement from "./pages/dashboard/categories/TagsManagement";
// Auth
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/auth/AuthPage";
import UserProfilePage from "./pages/auth/UserProfilePage";
import EditProfilePage from "./pages/auth/EditProfilePage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import NotfoundPage404 from "./pages/auth/NotfoundPage404";
import ForbiddenPage403 from "./pages/auth/ForbiddenPage403";
// Lessons
import LessonsPage from "./pages/lessons/LessonsPage";
import LessonDetailsPage from "./pages/lessons/LessonDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Lessons */}
        <Route element={<HomeLayout />}>
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="lessons/:id" element={<LessonDetailsPage />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashBoardPage />} />
          <Route path="lessons" element={<AdminLessonsPage />} />
          <Route path="lessons/add" element={<AddLessonPage />} />
          <Route path="lessons/edit/:id" element={<EditLessonPage />} />
          <Route path="categories" element={<CategoriesManagement />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/404" element={<NotfoundPage404 />} />
          <Route path="/403" element={<ForbiddenPage403 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
