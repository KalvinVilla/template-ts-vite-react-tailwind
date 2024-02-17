import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./hooks/useAuth.ts";

import { AuthStatus } from "./type/auth.ts";

import RequireAuth from "./component/main/RequireAuth.tsx";
import Layout from "./component/main/Layout.tsx";

import Login from "./page/Login.tsx";
import Loading from "./page/Loading.tsx";
import Index from "./page/Index.tsx";

import Private from "./page/Private.tsx";

function App() {
  
  const navigate = useNavigate();
  const location = useLocation();

  const { authenticate, status } = useAuth();

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if (status === AuthStatus.Authenticated) navigate(location.state?.from);
    if (status === AuthStatus.Unauthenticated)
      navigate("/login", { state: { from: location.pathname } });

  }, [status]);

  useEffect(() => {
    console.log(location.state)
    if (location.state !== null) {
      if (location.state.notification) {
        const { message, success } = location.state.notification;
        console.log(message, success);
      }
    }
  }, [location.state]);

  return (
    <Routes>
      <Route path="loading" element={<Loading />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Index />} />
        <Route element={<RequireAuth permission={"request/get"} />}>
          <Route path="private" element={<Private />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
