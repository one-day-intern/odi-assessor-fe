import React, { useEffect, useState } from "react";
import styles from "./GradeDetail.module.css";

interface GradeDetailOptions {
  fontSize?: string;
  labelSize?: string;
  labelColor?: string;
}

interface Props {
  grade: number;
  options?: GradeDetailOptions;
}

const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
const FPS = 60;

const GradeDetail = ({ grade, options }: Props) => {
  const [currentGrade, setCurrentGrade] = useState(0);
  const displayedGrade = (easeOutQuart(currentGrade/grade) * grade).toFixed(1);

  useEffect(() => {
    let interval: NodeJS.Timer;

    const incrementGrade = () => {
      if (currentGrade < grade) {
        setCurrentGrade((currentGrade) => currentGrade + 0.5);
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
      <p className={styles["grade--label"]} style={{color: options?.labelColor, fontSize: options?.labelSize}}>Overall Grade</p>
      <div className={styles["grade--course"]}>
        <p className={styles["grade--number"]} style={{fontSize: options?.fontSize}}>{displayedGrade}</p>
      </div>
    </div>
  );
};

export default GradeDetail;
