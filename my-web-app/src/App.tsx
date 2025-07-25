import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import UserCreate from "./pages/UserCreate";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";
import { useUserStore } from "./store/useUserStore";

function App() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <UserList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/user/create"
          element={
            isAuthenticated ? <UserCreate /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/user/edit/:id" element={<UserEdit />} />
      </Routes>
    </Layout>
  );
}

export default App;
