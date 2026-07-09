import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

function PublicLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold">
            Blog App
          </Link>

          <nav className="flex items-center gap-2">
            {pathname !== "/login" && (
              <Button variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
            )}

            {pathname !== "/register" && (
              <Button>
                <Link to="/register">Register</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-muted/40">
        <Outlet />
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-center px-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Blog App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
