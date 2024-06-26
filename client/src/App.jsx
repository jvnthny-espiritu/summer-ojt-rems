import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import Home from "./pages/home/Home";
import AdminHome from "./pages/admin_home/AdminHome";
import CenterHome from "./pages/rcc_account/CenterHome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="admin" element={<AdminHome />} />
          <Route path="center" element={<CenterHome />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}