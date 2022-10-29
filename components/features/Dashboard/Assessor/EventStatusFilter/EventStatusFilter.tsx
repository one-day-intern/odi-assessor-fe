import { motion, Variants } from "framer-motion";
import React from "react";
import styles from "./EventStatusFilter.module.css";

interface EventStatusFilterProps {
  status: "active" | "archived";
  setStatus: (status: "active" | "archived") => void;
}

const buttonVariants: Variants = {
  selected: {
    background: "#9076C0",
    color: "#FFFFFF",
  },
  notSelected: {
    background: "#FFFFFF",
    color: "#000000",
  },
};

const EventStatusFilter = ({ status, setStatus }: EventStatusFilterProps) => {
  return (
    <motion.div className={styles["event-group"]}>
      <motion.button
        variants={buttonVariants}
        initial={status === "active" ? "selected" : "notSelected"}
        animate={status === "active" ? "selected" : "notSelected"}
        exit={"notSelected"}
        tabIndex={status === "active" ? -1 : 0}
        className={styles["event-group__toggler"]}
        onClick={() => setStatus("active")}
        data-testid="event-active"
      >
        <p className={styles["event-group__text"]}>Active</p>
      </motion.button>
      <motion.button
        variants={buttonVariants}
        initial={status === "archived" ? "selected" : "notSelected"}
        animate={status === "archived" ? "selected" : "notSelected"}
        tabIndex={status === "archived" ? -1 : 0}
        exit={"notSelected"}
        className={styles["event-group__toggler"]}
        data-testid="event-archived"
        onClick={() => setStatus("archived")}
      >
        <p className={styles["event-group__text"]}>Archived</p>
      </motion.button>
    </motion.div>
  );
};

export default EventStatusFilter;
