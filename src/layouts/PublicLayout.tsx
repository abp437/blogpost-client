import { Link, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";

function PublicLayout() {
  return (
    <>
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold">
            Blog App
          </Link>

          <nav className="flex items-center gap-2">
            <Button variant="ghost">
              <Link to="/login">Login</Link>
            </Button>

            <Button>
              <Link to="/register">Register</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-muted/40">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;
