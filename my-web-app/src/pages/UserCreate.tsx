import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./UserCreate.module.css";

type UserForm = {
  name: string;
  surName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
  birthDate?: string;
};

export default function UserCreate() {
  const { register, handleSubmit, watch, setValue } = useForm<UserForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    const payload = {
      name: data.name,
      surName: data.surName,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      telephone: data.telephone,
      employment: data.employment,
      userAgreement: data.userAgreement,
      birthDate: data.birthDate,
    };

    try {
      await axios.post("/api/v1/users", payload, { withCredentials: true });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Server response:", error.response?.data);
      }
      alert("User creation failed");
    }
  };

  const name = watch("name");
  const surName = watch("surName");

  useEffect(() => {
    setValue("fullName", `${name || ""} ${surName || ""}`.trim());
  }, [name, surName, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        {...register("name", { required: true, maxLength: 64 })}
        placeholder="Name"
      />
      <input
        {...register("surName", { required: true, maxLength: 64 })}
        placeholder="Surname"
      />
      <input
        {...register("fullName", { required: true, maxLength: 130 })}
        placeholder="Full Name"
      />
      <input
        {...register("email", {
          required: true,
          pattern: /^\S+@\S+\.\S+$/,
        })}
        placeholder="Email"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
      />
      <input
        {...register("confirmPassword", {
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
        type="password"
        placeholder="Confirm Password"
      />
      <input
        {...register("birthDate", { required: false })}
        type="date"
        placeholder="Дата рождения"
      />
      <input
        {...register("telephone", {
          pattern: /^\+7\d{10}$/,
        })}
        placeholder="Telephone"
      />
      <select {...register("employment")}>
        <option value="">Select employment</option>
        <option value="developer">Developer</option>
        <option value="manager">Manager</option>
      </select>
      <label>
        <input type="checkbox" {...register("userAgreement")} /> I agree
      </label>
      <button type="submit">Create User</button>
    </form>
  );
}
