import React from "react";
import styles from "./ConferenceRoom.module.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  selectLocalPeer,
  selectPeers,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import VideoPlayer from "../VideoPlayer";
import Controls from "../Controls";
import WaitingRoomSidebar from "./WaitingRoomSidebar";

const ConferenceRoom = () => {
  const actions = useHMSActions();
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.main}
    >
      <div className={styles["video-grid"]}>
        <AnimatePresence>
          {peers
            .filter((peer) => peer.roleName !== "waiting-room")
            .map((peer) => (
              <motion.div
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={peer.id}
                className={`${styles["video-tile"]}`}
              >
                <VideoPlayer peer={peer} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <div className={styles["video-controls"]}>
        <Controls onLeave={() => actions.leave()} />
      </div>
      {localPeer?.roleName === "assessor" && <WaitingRoomSidebar />}
    </motion.main>
  );
};

export default ConferenceRoom;
