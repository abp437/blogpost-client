import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/authClient";
import { Button } from "@/components/ui/button";

function ProtectedLayout() {
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  const client = useApolloClient();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    client.clearStore();
    navigate("/", { replace: true });
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">
            Create and manage your blog posts
          </p>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <Outlet />
    </main>
  );
}

export default ProtectedLayout;
