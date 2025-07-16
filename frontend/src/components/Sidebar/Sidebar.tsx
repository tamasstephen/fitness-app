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

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {menu.map((item) => (
        <p key={item.label}>
          <Link to={item.path}>{item.label}</Link>
        </p>
      ))}
      <p>
        <a href="http://localhost:5001/login">Login</a>
      </p>
      <p>
        <a href="http://localhost:5001/logout">Logout</a>
      </p>
    </div>
  );
}
