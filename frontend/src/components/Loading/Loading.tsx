import { Spinner } from "../Spinner";
import styles from "./Loading.module.scss";

export function Loading() {
  return (
    <div className={styles.loading}>
      <Spinner />
      <span className={styles.text}>Loading... the page</span>
    </div>
  );
}
