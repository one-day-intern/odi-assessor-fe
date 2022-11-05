import React, { ReactNode } from 'react'

import styles from "./Backdrop.module.css";

interface BackdropProps {
  children?: ReactNode;
}

const Backdrop = ({ children } : BackdropProps) => {
  return (
    <div className={ styles["backdrop"] } data-testid="backdrop">
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__circle"] }></div>
        <div className={ styles["backdrop__content"]}>
            { children }
        </div>
    </div>
  )
}

export { Backdrop }