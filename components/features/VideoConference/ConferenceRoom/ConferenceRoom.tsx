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

const restrictedRoles = ["waiting-room", "removed"];

interface Props {
  onEndRoom?: () => void;
}

const ConferenceRoom: React.FC<Props> = ({ onEndRoom }) => {
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
            .filter((peer) => !restrictedRoles.includes(peer.roleName!))
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
        <Controls onEndRoom={onEndRoom} onLeave={() => actions.leave()} />
      </div>
      {localPeer?.roleName === "host" && <WaitingRoomSidebar />}
    </motion.main>
  );
};

export default ConferenceRoom;
