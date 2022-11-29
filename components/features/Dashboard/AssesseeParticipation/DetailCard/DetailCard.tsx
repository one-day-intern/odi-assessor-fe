import React from 'react';
import styles from "./DetailCard.module.css";

const DetailCard = ({ children }: HOCProps) => {
  return (
    <div data-testid="card" className={styles["card"]}>{ children }</div>
  )
}

export default DetailCard