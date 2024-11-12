import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Home
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/home/HomePage";

//Dashboard
import DashboardLayout from "./layouts/DashboardLayout";
import DashBoardPage from "./pages/dashboard/DashboardPage";
import AdminLessonsPage from "./pages/dashboard/lessons/AdminLessonPage";
import AddLessonPage from "./pages/dashboard/lessons/add/AddLessonPage";
import EditLessonPage from "./pages/dashboard/lessons/edit/EditLessonPage";
// Auth
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/auth/AuthPage";
import UserProfilePage from "./pages/auth/UserProfilePage";
import EditProfilePage from "./pages/auth/EditProfilePage";
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
          <Route path="lessons/add" element={<AddLessonPage />} />
          <Route path="lessons/edit/:id" element={<EditLessonPage />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
