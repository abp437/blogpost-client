import {
  useState,
  type FormEvent,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Button,
} from "@/components/ui/button";

import axiosInstance from "@/api/axiosInstance";
import {
  ACCESS_TOKEN_STORAGE_KEY,
} from "@/constants/authClient";


interface LoginFormData {
  email: string;
  password: string;
}


function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState<LoginFormData>({
      email: "",
      password: "",
    });


  const [message, setMessage] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  }


  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
  ) {

    e.preventDefault();

    setLoading(true);
    setMessage("");


    try {

      const response =
        await axiosInstance.post(
          "/api/auth/login",
          formData,
        );


      const {
        accessToken,
        user,
      } = response.data;


      localStorage.setItem(
        ACCESS_TOKEN_STORAGE_KEY,
        accessToken,
      );


      setMessage(
        `Welcome back, ${user.name}!`,
      );


      setFormData({
        email: "",
        password: "",
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {

      setMessage(
        error instanceof Error
          ? error.message
          : "Login failed",
      );


    } finally {

      setLoading(false);

    }

  }


  return (

    <div className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-muted/40
      px-4
    ">

      <Card className="
        w-full
        max-w-md
        shadow-lg
      ">

        <CardHeader className="
          space-y-2
          text-center
        ">

          <CardTitle className="
            text-2xl
            font-bold
          ">
            Welcome Back
          </CardTitle>


          <CardDescription>
            Login to access your account
          </CardDescription>

        </CardHeader>


        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="
              space-y-5
            "
          >

            <div className="
              space-y-2
            ">

              <Label htmlFor="email">
                Email
              </Label>


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


            <div className="
              space-y-2
            ">

              <Label htmlFor="password">
                Password
              </Label>


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
              className="
                w-full
              "
              disabled={loading}
            >

              {
                loading
                  ? "Logging in..."
                  : "Login"
              }

            </Button>


            {
              message && (
                <p
                  className="
                    text-center
                    text-sm
                    text-muted-foreground
                  "
                >
                  {message}
                </p>
              )
            }

            <div className="
  text-center
  text-sm
  text-muted-foreground
">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="
      font-medium
      text-primary
      hover:underline
    "
              >
                Register
              </Link>
            </div>

          </form>

        </CardContent>

      </Card>

    </div>

  );

}


export default LoginForm;
