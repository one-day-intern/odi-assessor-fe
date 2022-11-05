import {
  selectIsPeerAudioEnabled,
  selectPeerAudioByID,
  useHMSStore,
  HMSPeer,
} from "@100mslive/react-sdk";
import React from "react";
import SoundIndicator from "../SoundIndicator";
import styles from "./Overlay.module.css";

interface Props extends React.PropsWithChildren {
  peer?: HMSPeer;
}

const Overlay: React.FC<Props> = ({ peer }) => {
  const audioLevel = useHMSStore(selectPeerAudioByID(peer?.id));
  const micEnabled = useHMSStore(selectIsPeerAudioEnabled(peer?.id));

  return (
    <div className={styles["video-overlay"]}>
      <SoundIndicator audioLevel={audioLevel} micDisabled={!micEnabled} />
    </div>
  );
};

export default Overlay;
