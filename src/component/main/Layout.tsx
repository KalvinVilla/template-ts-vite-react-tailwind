import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative">
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
