import React, { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.css";

interface Props {
  timeEndFromUnixEpoch: number;
  nowTime?: number;
}

const SECONDS_IN_HOURS = 3600;
const SECONDS_IN_MINUTES = 60;
const MINUTES_IN_HOURS = 60;

const getHrsMinsSecs = (deltaSeconds: number): [number, number, number] => {
  const hours = Math.floor(deltaSeconds / SECONDS_IN_HOURS);
  const minutes =
    Math.floor(deltaSeconds / SECONDS_IN_MINUTES) - hours * MINUTES_IN_HOURS;
  const seconds = deltaSeconds % SECONDS_IN_MINUTES;

  return [hours, minutes, seconds];
};

const CountdownTimer = ({ timeEndFromUnixEpoch, nowTime }: Props) => {
  const now = nowTime ?? Math.floor(new Date().getTime() / 1000);

  const [deltaSecond, setDeltaSecond] = useState(timeEndFromUnixEpoch - now);
  const [hours, minutes, seconds] = getHrsMinsSecs(deltaSecond);

  useEffect(() => {
    // Countdown interval
    const countdown = setInterval(() => {
      setDeltaSecond((prev) => --prev);
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, []);
  return (
    <div className={styles["timer"]}>
      {deltaSecond >= 0 ? (
        <>
          <p className={styles["timer--label"]}>Time until Assessment ends:</p>
          <p className={styles["timer--countdown"]}>
            <span>{hours.toString().padStart(2, "0")}</span>:
            <span>{minutes.toString().padStart(2, "0")}</span>:
            <span>{seconds.toString().padStart(2, "0")}</span>
          </p>
        </>
      ) : (
        <>
          <p className={styles["timer--label"]}>Assessment event has been</p>
          <p className={styles["timer--countdown"]}>Completed</p>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
