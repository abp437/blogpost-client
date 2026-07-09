import {
  Navigate,
  Outlet,
} from "react-router-dom";


import {
  ACCESS_TOKEN_STORAGE_KEY,
} from "@/constants/authClient";


function ProtectedLayout() {

  const token =
    localStorage.getItem(
      ACCESS_TOKEN_STORAGE_KEY,
    );


  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  return (

    <main>

      <Outlet />

    </main>

  );

}


export default ProtectedLayout;
