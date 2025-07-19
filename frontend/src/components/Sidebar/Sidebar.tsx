import { menu } from "@/constants/menu";
import styles from "./Sidebar.module.scss";
import { Link } from "@tanstack/react-router";
import { AuthStatus } from "@/types/authStatus";
import { UseQueryResult } from "@tanstack/react-query";

/*
MENU ITEMS:
- Workout plan
- Diet plan
- Online training
- Profile
- Logout
*/

export function Sidebar({
  authStatus,
}: {
  authStatus: UseQueryResult<AuthStatus, Error>;
}) {
  const { data, isLoading, isError } = authStatus;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const authLinks = () => {
    if (data?.status === "authenticated") {
      return <a href={`${BACKEND_URL}/logout`}>Logout</a>;
    }
    return <a href={`${BACKEND_URL}/login`}>Login</a>;
  };

  return (
    <div className={styles.sidebar}>
      <>
        {menu.map((item) => (
          <p key={item.label}>
            <Link to={item.path as any}>{item.label}</Link>
          </p>
        ))}
        <p>{authLinks()}</p>
      </>
    </div>
  );
}
