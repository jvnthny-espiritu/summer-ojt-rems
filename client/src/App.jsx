import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import AdminHome from "./pages/admin_home/AdminHome";
import CenterHome from "./pages/rcc_account/CenterHome";

import List_ResearchCenter from "./pages/ResearchCenters/List_ResearchCenter";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <List_ResearchCenter /> } />
      </Routes>

      <Routes>
        <Route index path="/" element={ <Home /> } />
        
        <Route path="/center">
          <Route path=":center" element= { <CenterHome /> } />
        </Route>
        
        <Route path="/account">
          <Route index element={ <Login /> } />
        </Route>
        
        {/* <Route path="/admin" element={<AdminHome />} /> */}  
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </>
  );
}