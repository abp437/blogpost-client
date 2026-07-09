import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <main className="min-h-screen bg-muted/40">
      <Outlet />
    </main>
  );
}

export default PublicLayout;
