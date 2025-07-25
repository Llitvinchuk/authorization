import type { FC, ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  if (location.pathname === "/login") return <>{children}</>;

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <nav className={styles.button}>
          <Link to="/user/create" className={styles.text}>
            Create User
          </Link>
        </nav>
        <div style={{ flex: 1 }}>
          <header className={styles.header}>Авторизация</header>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
