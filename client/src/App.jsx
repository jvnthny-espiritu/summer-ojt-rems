import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";

// Pages
import LoginForm from "./pages/login/LoginForm";
import Home from "./pages/home/Home";
import AdminHome from "./pages/admin_home/AdminHome";
import StaffHome from "./pages/staff_home/StaffHome"
import Root from "./pages/Root";
import ErrorPage from "./pages/error/ErrorPage";

// Routes
// /
// /login

// /researchcenterlist (placeholder)
// /center/:researchcenterid
// /device/:deviceid


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      // loader={rootLoader}
      // action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Home />} />

        <Route
          path="/login"
          element={ <LoginForm /> }
        />

        <Route
          path="/center/:researchcenterid"
          element={ <StaffHome /> }
          loader= { ({ params }) => {
            // return fetch(`/api/teams/${params.teamId}.json`);
            // params += "1"

            // backend logic dito iyon
            return params.researchcenterid
          }}
        />

        <Route
          path="/admin"
          element={ <AdminHome /> }
        />

        {/*<Route*/}
        {/*  path="contacts/:contactId"*/}
        {/*  element={<Contact />}*/}
        {/*  loader={contactLoader}*/}
        {/*  action={contactAction}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path="contacts/:contactId/edit"*/}
        {/*  element={<EditContact />}*/}
        {/*  loader={contactLoader}*/}
        {/*  action={editAction}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path="contacts/:contactId/destroy"*/}
        {/*  action={destroyAction}*/}
        {/*/>*/}
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <>
      {/*<Routes>*/}
      {/*  <Route path="/">*/}
      {/*    <Route index element={<Home />} />*/}
      {/*    <Route path="login" element={<LoginForm />} />*/}
      {/*    <Route path="admin" element={<AdminHome />} />*/}
      {/*    <Route path="center" element={<CenterHome />} />*/}
      {/*    /!* <Route path="*" element={<NoPage />} /> *!/*/}
      {/*  </Route>*/}
      {/*</Routes>*/}
      <RouterProvider router={router}/>
    </>
  );
}