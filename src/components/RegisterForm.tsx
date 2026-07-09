import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axiosInstance";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosInstance.post("/api/auth/register", formData);

      setMessage(response.data.message || "Registration successful");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 p-6 text-center">
          <CardTitle className="font-heading text-3xl font-bold tracking-tight">
            Create Account
          </CardTitle>

          <CardDescription className="font-serif text-base">
            Register to start creating and sharing posts
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>

            {message && (
              <p
                aria-live="polite"
                className="text-center text-sm text-muted-foreground"
              >
                {message}
              </p>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
