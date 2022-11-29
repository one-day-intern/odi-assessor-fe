import React, { useEffect, useState } from "react";
import styles from "./GradeDetail.module.css";

interface Props {
  grade: number;
}

const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
const FPS = 60;

const GradeDetail = ({ grade }: Props) => {
  const [currentGrade, setCurrentGrade] = useState(0);
  const displayedGrade = (easeOutQuart(currentGrade/grade) * grade).toFixed(1);

  useEffect(() => {
    let interval: NodeJS.Timer;

    const incrementGrade = () => {
      if (currentGrade < grade) {
        setCurrentGrade((currentGrade) => currentGrade += 0.5);
        return;
      }

      clearInterval(interval);
    };

    interval = setInterval(incrementGrade, 1000 / FPS);

    return () => {
      clearInterval(interval);
    };
  }, [grade, currentGrade]);

  return (
    <div className={styles["grade"]}>
      <p className={styles["grade--label"]}>Overall Grade</p>
      <div className={styles["grade--course"]}>
        <p className={styles["grade--number"]}>{displayedGrade}</p>
      </div>
    </div>
  );
};

export default GradeDetail;
