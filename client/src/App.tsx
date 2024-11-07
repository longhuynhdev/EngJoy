import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Home
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/home/page";
// Auth
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/auth/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Dashboard routes */}
        {/* <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="lessons/edit/:id" element={<EditLesson />} />
        </Route> */}

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
