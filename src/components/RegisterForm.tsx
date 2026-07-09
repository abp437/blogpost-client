import {
  useState,
  type FormEvent,
} from "react";
import axiosInstance from "@/api/axiosInstance";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    try {
      const response =
        await axiosInstance.post(
          "/api/auth/register",
          formData,
        );
      setMessage(
        response.data.message ||
        "Registration successful",
      );
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Registration failed",
        );
      }
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
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
        >
          Register
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

export default RegisterForm;
