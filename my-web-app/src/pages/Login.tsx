import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store/useUserStore";
import styles from "./Login.module.css";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();
  const setToken = useUserStore((s) => s.setToken);

  const setAuthenticated = useUserStore((s) => s.setAuthenticated);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await axios.post("/api/v1/auth/login", data, {
        withCredentials: true,
      });

      const res = await axios.get("/api/v1/auth/me", {
        withCredentials: true,
      });

      if (res.data) {
        setToken("ok");
        setAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Неверный email или пароль");
    }
  };

  return (
    <div>
      <div style={{ flex: 1 }}>
        <header className={styles.header}>Авторизация</header>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("email", { required: true })} placeholder="Email" />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
