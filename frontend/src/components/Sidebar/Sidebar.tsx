import { menu } from "@/constants/menu";

/*
MENU ITEMS:
- Workout plan
- Diet plan
- Online training
- Profile
- Logout
*/

import styles from "./Sidebar.module.scss";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "../Spinner/Spinner";

export function Sidebar() {
  const { authStatus, isAuthLoading, isAuthError } = useAuth();

  const isAuthenticated = authStatus?.data?.status === "authenticated";

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const authLinks = isAuthenticated ? (
    <a href={`${BACKEND_URL}/logout`}>Logout</a>
  ) : (
    <a href={`${BACKEND_URL}/login`}>Login</a>
  );

  if (isAuthLoading) {
    return (
      <div className={styles.sidebar}>
        <Spinner />
      </div>
    );
  }

  if (isAuthError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.sidebar}>
      {isAuthLoading && <Spinner />}

      {menu.map((item) => (
        <p key={item.label}>
          <Link to={item.path as any}>{item.label}</Link>
        </p>
      ))}
      <p>{authLinks}</p>
    </div>
  );
}
