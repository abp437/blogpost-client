import {
  useState,
  type FormEvent,
} from "react";
import axiosInstance from "@/api/axiosInstance";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/authClient";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
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
        `Welcome ${user.name}`,
      );

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        setMessage(
          error.message,
        );
      } else {
        setMessage(
          "Login failed",
        );
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
      }}
    >
      <h1>
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <div>
          <label>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {
            loading
              ? "Logging in..."
              : "Login"
          }
        </button>
      </form>

      {message && (
        <p>
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginForm;
