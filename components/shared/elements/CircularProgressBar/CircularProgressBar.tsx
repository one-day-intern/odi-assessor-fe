import { size } from "cypress/types/lodash";
import React, { useEffect, useState } from "react";
import styles from "./CircularProgressBar.module.css";

interface CircularProgressOptions {
  size?: string;
  fontSize?: string;
  bgColor?: string;
}

interface CircularProgressBarProps {
  progress: number;
  options?: CircularProgressOptions;
}

const convertPercentageToDegrees = (percentage: number) =>
  (percentage / 100) * 360;

const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
const FPS = 60;

const CircularProgressBar = ({
  progress,
  options,
}: CircularProgressBarProps) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const degree =
    easeOutQuart(currentPercentage / progress) *
    convertPercentageToDegrees(progress);
    const progressDisplay = progress === 0 ? 0 : Math.floor(easeOutQuart(currentPercentage/progress) * progress);
  const bgColor = options?.bgColor ?? "white";

  useEffect(() => {
    let incrementTimer: NodeJS.Timer;

    const incrementProgress = () => {
      if (currentPercentage < progress) {
        setCurrentPercentage((prev) => ++prev);
      }

      if (currentPercentage >= progress) {
        clearTimeout(incrementTimer);
      }
    };

    incrementTimer = setInterval(incrementProgress, 1000 / FPS);

    return () => {
      clearInterval(incrementTimer);
    };
  }, [currentPercentage, progress]);

  return (
    <div data-testid="circular-bar">
      <div
        className={styles["circle"]}
        style={{
          width: options?.size ?? "10ch",
          height: options?.size ?? "10ch",
          background: `radial-gradient(${bgColor} 50%, transparent 51%), 
          conic-gradient(transparent 0deg ${degree}deg, ${bgColor} ${degree}deg 360deg),
          conic-gradient(var(--primary) 0deg, var(--primary)) `,
        }}
      >
        <p
          className={styles["circle--title"]}
          style={{ fontSize: options?.fontSize ?? "1.5rem" }}
        >
          {progressDisplay}%
        </p>
      </div>
    </div>
  );
};

export default CircularProgressBar;
