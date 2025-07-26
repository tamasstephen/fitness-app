import { useEffect, useState } from "react";
import { SessionCard } from "./SessionCard";
import styles from "./OnlineSession.module.scss";
import { TrainingSession } from "@/interfaces";

interface OnlineSessionProps {
  items?: TrainingSession[];
}

export const OnlineSession = ({ items }: OnlineSessionProps) => {
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(
    []
  );

  useEffect(() => {
    setTrainingSessions(items || []);
    console.log(items);
  }, [items]);

  return (
    <div className={styles["online-session-container"]}>
      <h1 className={styles["online-session-title"]}>Online Sessions</h1>
      <div className={styles["online-session"]}>
        {trainingSessions?.map((session) => (
          <SessionCard key={session.id} {...session} />
        ))}
      </div>
    </div>
  );
};
