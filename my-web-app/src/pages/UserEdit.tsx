import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

type UserForm = {
  name: string;
  surName: string;
  fullName: string;
  email: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
};

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<UserForm>();

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/v1/users/${id}`, { withCredentials: true })
      .then((res) => {
        const user = res.data;
        setValue("name", user.name);
        setValue("surName", user.surName);
        setValue("fullName", user.fullName);
        setValue("email", user.email);
        setValue("telephone", user.telephone);
        setValue("employment", user.employment);
        setValue("userAgreement", user.userAgreement);
      })
      .catch((err) => {
        console.error("Error loading user", err);
      });
  }, [id, setValue]);

  const onSubmit = async (data: UserForm) => {
    try {
      await axios.put(`/api/v1/users/${id}`, data, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("User update error:", error);
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      <input {...register("surName")} placeholder="Surname" />
      <input {...register("fullName")} placeholder="Full Name" />
      <input {...register("email")} placeholder="Email" disabled />
      <input {...register("telephone")} placeholder="Telephone" />
      <select {...register("employment")}>
        <option value="">Select employment</option>
        <option value="developer">Developer</option>
        <option value="manager">Manager</option>
      </select>
      <label>
        <input type="checkbox" {...register("userAgreement")} /> I agree
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
