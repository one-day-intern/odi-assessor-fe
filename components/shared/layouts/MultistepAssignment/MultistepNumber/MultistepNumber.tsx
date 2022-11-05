import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styles from "./MultistepNumber.module.css";

interface MultistepNumberProps {
  id: number;
  name: string;
  isSelected: boolean;
  isPrevious: boolean;
  onSelect: React.MouseEventHandler<HTMLButtonElement>;
}

const MultistepNumber = ({
  id,
  name,
  isSelected,
  isPrevious,
  onSelect,
}: MultistepNumberProps) => {
  return (
    <button
      onClick={onSelect}
      disabled={!isPrevious}
      className={`${styles["multistep__number"]}  ${
        !isPrevious && styles["multistep__number--disabled"]
      }`}
      data-testid="number"
    >
      <div>
        <motion.div
          className={styles["multistep__number--circle"]}
          animate={{
            background:
              isPrevious || isSelected ? "#3D65D8" : "rgba(0, 0, 0, 0.5)",
          }}
        >
          <AnimatePresence mode="wait">
            {" "}
            {isPrevious ? (
              <motion.svg
                width="25"
                height="19"
                viewBox="0 0 25 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M1 10.0456L7.95441 17L23.9544 1"
                  stroke="white"
                  strokeWidth="2.82067"
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: isPrevious ? 1 : 0,
                  }}
                  exit={{
                    pathLength: 0,
                  }}
                  key="path"
                />
              </motion.svg>
            ) : (
              <motion.p
                className={styles["multistep__number--number"]}
                initial={{
                  opacity: 0,
                }}
                key="text"
                animate={{
                  opacity: isPrevious ? 0 : 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                {id + 1}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <motion.p
        className={styles["multistep__number--text"]}
        animate={{
          color: isPrevious || isSelected ? "#3D65D8" : "rgba(0, 0, 0, 0.5)",
        }}
      >
        {name}
      </motion.p>
    </button>
  );
};

export default MultistepNumber;
