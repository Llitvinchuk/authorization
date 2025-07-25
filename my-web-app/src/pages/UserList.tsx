import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./UserList.module.css";

type User = {
  id: string;
  email: string;
  name?: string;
  surName?: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("/api/v1/users", { withCredentials: true })
      .then((res) => {
        console.log("FULL response:", res.data);

        const raw = res.data;
        const usersArray: User[] = Array.isArray(raw) ? raw : [];

        console.log("Final users array:", usersArray);
        setUsers(usersArray);
      })
      .catch((err) => {
        console.error("Error loading users", err);
      });
  }, []);

  return (
    <div>
      <h2 className={styles.header}>Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                {user.name} {user.surName}
              </td>
              <td>
                <Link to={`/user/edit/${user.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
