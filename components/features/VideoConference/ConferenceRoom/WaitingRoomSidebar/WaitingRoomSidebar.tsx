import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./WaitingRoomSidebar.module.css";
import SidebarTile from "./SidebarTile";
import {
  selectPeersByRole,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";

const WaitingRoomSidebar = () => {
  const [opened, setOpened] = useState(false);
  const actions = useHMSActions();
  const peersInWaitingRoom = useHMSStore(selectPeersByRole("waiting-room"));

  return (
    <motion.aside
      className={styles["sidebar"]}
      initial={false}
      animate={{ transform: opened ? "translateX(0%)" : "translateX(-95%)" }}
      transition={{ type: "tween", ease: "easeOut" }}
    >
      <motion.h2 className={styles["sidebar-header"]}>
        These people are in the waiting room:
      </motion.h2>
      <motion.button
        onClick={() => setOpened(!opened)}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: opened ? 180 : 0, x: "-50%" }}
        className={styles["sidebar-open"]}
      >
        &gt;
      </motion.button>
      <div className={styles["waiting-room_list"]}>
        {peersInWaitingRoom.map((peer) => (
          <SidebarTile
            key={peer.id}
            onAdmit={() => actions.changeRole(peer.id, "assessee", true)}
            onReject={() => actions.removePeer(peer.id, "Rejected to enter")}
            peerName={peer.name}
          />
        ))}
      </div>
    </motion.aside>
  );
};

export default WaitingRoomSidebar;
