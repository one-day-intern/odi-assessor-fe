import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styles from "./EmailList.module.css";

interface Props {
  emailList: string[];
  setEmailList: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmailList = ({ emailList, setEmailList }: Props) => {
  return (
    <div className={styles["email-list"]}>
      <h4>Email List</h4>
      <div className={styles["emails"]}>
        <AnimatePresence>
          {emailList.map((email) => (
            <motion.div
              layout
              style={{ originX: 0, originY: 0 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={styles["email"]}
              key={email}
            >
              <p>{email}</p>
              <button
                onClick={() =>
                  setEmailList((prev) =>
                    prev.filter((presentEmails) => presentEmails !== email)
                  )
                }
                className={styles["email-cross"]}
              >
                &#10006;
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmailList;
