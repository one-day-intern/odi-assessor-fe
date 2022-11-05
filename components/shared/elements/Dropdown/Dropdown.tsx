import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Dropdown.module.css";

interface DropdownElements {
  id: number;
  reactElement: () => JSX.Element;
}

interface DropdownProps {
  children: ReactNode;
  isOpened: boolean;
  setOpened: React.MouseEventHandler<HTMLButtonElement>;
  dropdownElements?: DropdownElements[];
  style?: React.CSSProperties;
}

const dropdownVariants = {
  closed: {
    opacity: 0,
    y: -5,
    transition: {
      type: "tween",
    },
  },
  opened: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
    },
  },
};

const Dropdown = ({
  children,
  dropdownElements,
  isOpened,
  setOpened,
  style,
}: DropdownProps) => {
  return (
    <div style={style} className={styles["dropdown"]}>
      <button
        className={styles["dropdown__button"]}
        onClick={setOpened}
        data-testid="dropdown"
      >
        {children}
        <motion.svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M10.4359 0.292498L6.55589 4.1725L2.67589 0.2925C2.28589 -0.0975002 1.65589 -0.0975001 1.26589 0.2925C0.875889 0.6825 0.875889 1.3125 1.26589 1.7025L5.85589 6.2925C6.24589 6.6825 6.87589 6.6825 7.26589 6.2925L11.8559 1.7025C12.2459 1.3125 12.2459 0.682498 11.8559 0.292498C11.4659 -0.0875018 10.8259 -0.0975017 10.4359 0.292498Z"
            fill={style?.color ?? "black"}
            fillOpacity={style?.opacity ?? "0.5"}
            initial={{ rotate: 0 }}
            animate={{
              rotate: isOpened ? 180 : 0,
            }}
          />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpened && (
          <motion.div
            data-testid="drop"
            variants={dropdownVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className={styles["dropdown__elements"]}
          >
            {dropdownElements?.map((element) => (
              <element.reactElement key={element.id} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Dropdown };
