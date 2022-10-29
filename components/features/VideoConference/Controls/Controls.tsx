import React from "react";
import styles from "./Controls.module.css";
import { motion } from "framer-motion";
import {
  selectIsConnectedToRoom,
  selectLocalPeer,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import VideoConferenceIcon from "@components/shared/svg/AppIcons/VideoConferenceIcon";
import MicrophoneIcon from "./MicrophoneIcon";
import LeaveIcon from "./LeaveIcon";

interface Props {
  onLeave?: () => void;
  onEndRoom?: () => void;
}

const Controls: React.FC<Props> = ({ onLeave, onEndRoom }) => {
  const { isLocalVideoEnabled, isLocalAudioEnabled, toggleAudio, toggleVideo } =
    useAVToggle((e) => {
      console.log(e.name);
    });
  const inRoom = useHMSStore(selectIsConnectedToRoom);
  const localPeer = useHMSStore(selectLocalPeer);
  const giveHostRoomControls = localPeer?.roleName === "host";

  return (
    <div className={`${styles.controls}`}>
      <motion.button
        whileTap={{ scale: 0.8 }}
        className={`${styles["controls-button"]} ${
          isLocalVideoEnabled ? "" : styles.disabled
        }`}
        onClick={toggleVideo}
      >
        <VideoConferenceIcon color={isLocalVideoEnabled ? "black" : "white"} />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.8 }}
        className={`${styles["controls-button"]} ${
          isLocalAudioEnabled ? "" : styles.disabled
        }`}
        onClick={toggleAudio}
      >
        <MicrophoneIcon color={isLocalAudioEnabled ? "black" : "white"} />
      </motion.button>
      {inRoom && (
        <>
          {!giveHostRoomControls && (
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => onLeave && onLeave()}
              className={`${styles["controls-button"]} ${styles.disabled}`}
            >
              <LeaveIcon color="white" />
            </motion.button>
          )}
          {giveHostRoomControls && (
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => onEndRoom && onEndRoom()}
              className={`${styles["end-room-button"]}`}
            >
              END ROOM
            </motion.button>
          )}
        </>
      )}
    </div>
  );
};

export default Controls;
