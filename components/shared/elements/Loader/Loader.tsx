import React from 'react'
import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <div data-testid="loader" className={styles["loader"]}></div>
  )
}

export {Loader}