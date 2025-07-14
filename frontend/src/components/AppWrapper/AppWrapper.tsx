import styles from "./AppWrapper.module.scss";

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles["app-wrapper"]}>{children}</div>;
};
