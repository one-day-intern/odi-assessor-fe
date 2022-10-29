import React, { useEffect, useRef } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectIsInPreview,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import styles from "./PreviewRoom.module.css";
import { motion } from "framer-motion";
import { Loader } from "@components/shared/elements/Loader";
import { Button } from "@components/shared/elements/Button";
import VideoPlayer from "../VideoPlayer";
import Controls from "../Controls";

interface Props extends React.PropsWithChildren {
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  token?: string;
}

const PreviewRoom: React.FC<Props> = ({ token, setIsConnected }) => {
  const isConnecting = useRef(false);
  const localPeer = useHMSStore(selectLocalPeer);
  const actions = useHMSActions();
  const inPreview = useHMSStore(selectIsInPreview);

  useEffect(() => {
    if (!inPreview && !isConnecting.current && token) {
      isConnecting.current = true;
      actions.preview({ authToken: token, userName: "wizzy" });
    } else if (inPreview) {
      isConnecting.current = false;
      setIsConnected(true);
    }
    // eslint-disable-next-line
  }, [inPreview]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.main}
    >
      {!inPreview && (
        <div className={styles["loader-container"]}>
          <Loader />
        </div>
      )}
      {inPreview && (
        <div className={styles["preview-room"]}>
          <section
            className={`${styles["preview-room_section"]} ${styles["video-container"]}`}
          >
            <VideoPlayer peer={localPeer} />
          </section>
          <section className={styles["preview-room_section"]}>
            <h1>Ready to join?</h1>
            <Controls />
            <Button
              style={{ fontWeight: "bold", fontSize: "1rem", maxWidth: 300 }}
              onClick={() => {
                if (token) {
                  actions.join({ authToken: token, userName: "wizzy" });
                }
              }}
              variant="primary"
            >
              Join Room
            </Button>
          </section>
        </div>
      )}
    </motion.main>
  );
};

export default PreviewRoom;
