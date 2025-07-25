import { Link } from "@tanstack/react-router";
import styles from "./SessionCard.module.scss";

interface SessionCardProps {
  id: string;
  date_time: string;
  duration: number;
  title: string;
  training_status: string;
}

export const SessionCard = ({
  id,
  date_time,
  duration,
  title,
  training_status,
}: SessionCardProps) => {
  return (
    <Link to="/auth/training/$id" params={{ id }}>
      <div className={styles["session-card"]}>
        <div className={styles["session-card-content"]}>
          <h3 className={styles["session-card-title"]}>{title}</h3>
          <p className={styles["session-card-date-time"]}>{date_time}</p>
          <p className={styles["session-card-duration"]}>{duration}</p>
          <p className={styles["session-card-training-status"]}>
            {training_status}
          </p>
        </div>
      </div>
    </Link>
  );
};
