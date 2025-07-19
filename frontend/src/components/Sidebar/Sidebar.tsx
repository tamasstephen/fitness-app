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
import { QueryWrapper } from "../QueryWrapper";
import { AuthStatus } from "@/types/authStatus";

export function Sidebar() {
  const response = useAuth();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const authLinks = (data: AuthStatus | undefined) => {
    return data?.data.status === "authenticated" ? (
      <a href={`${BACKEND_URL}/logout`}>Logout</a>
    ) : (
      <a href={`${BACKEND_URL}/login`}>Login</a>
    );
  };

  return (
    <div className={styles.sidebar}>
      <QueryWrapper dataset={response}>
        {(data) => {
          return (
            <>
              {menu.map((item) => (
                <p key={item.label}>
                  <Link to={item.path as any}>{item.label}</Link>
                </p>
              ))}
              <p>{authLinks(data)}</p>
            </>
          );
        }}
      </QueryWrapper>
    </div>
  );
}
