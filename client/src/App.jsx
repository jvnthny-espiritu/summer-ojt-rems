import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import Home from "./pages/home/Home";
import AdminHome from "./pages/admin_home/AdminHome";
import CenterHome from "./pages/rcc_account/CenterHome";

import List_ResearchCenter from "./pages/ResearchCenters/List_ResearchCenter";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="admin" element={<AdminHome />} />
          <Route path="center" element={<CenterHome />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>

        {/* <Route index path="/" element={ <Home /> } />
        
        <Route path="/center">
          <Route path=":center" element= { <CenterHome /> } />
        </Route>
        
        <Route path="/account">
          <Route index element={ <Login /> } />
        </Route> */}
        
        {/* <Route path="/admin" element={<AdminHome />} /> */}  
        {/* <Route path="*" element={<NoPage />} /> */}
      
    </>
  );
}