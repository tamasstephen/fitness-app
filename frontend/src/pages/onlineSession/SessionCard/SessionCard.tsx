import { Link } from "@tanstack/react-router";
import styles from "./SessionCard.module.scss";
import { TrainingSession } from "@/interfaces";
import { format } from "date-fns";

export const SessionCard = ({
  id,
  date_time,
  duration,
  title,
  training_status,
}: TrainingSession) => {
  const formattedDate = format(new Date(date_time), "dd/MM/yyyy HH:mm");
  return (
    <Link to="/auth/training/$id" params={{ id }}>
      <div className={styles["session-card"]}>
        <div className={styles["session-card-content"]}>
          <h3 className={styles["session-card-title"]}>{title}</h3>
          <p
            aria-label="Date and Time"
            className={styles["session-card-date-time"]}
          >
            {formattedDate}
          </p>
          <p className={styles["session-card-duration"]}>{duration}</p>
          <p className={styles["session-card-training-status"]}>
            {training_status}
          </p>
        </div>
      </div>
    </Link>
  );
};
