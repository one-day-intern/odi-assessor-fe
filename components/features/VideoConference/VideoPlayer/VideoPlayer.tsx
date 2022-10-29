import React from "react";
import styles from "./VideoPlayer.module.css";
import {
  useVideo,
  HMSPeer,
  useHMSStore,
  selectLocalPeer,
  selectIsPeerVideoEnabled,
} from "@100mslive/react-sdk";
import Overlay from "./Overlay";

interface Props extends React.PropsWithChildren {
  peer?: HMSPeer;
}

const VideoPlayer: React.FC<Props> = ({ peer }) => {
  const { videoRef } = useVideo({ trackId: peer?.videoTrack });
  const videoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer?.id));
  const localPeer = useHMSStore(selectLocalPeer);

  return (
    <div className={styles["video-container"]}>
      <video
        className={`${localPeer === peer ? styles["reversed"] : ""}`}
        id="video-player"
        ref={videoRef}
        autoPlay
        muted
        playsInline
      />
      {!videoEnabled && <div className={styles["video-disabled"]}></div>}
      <Overlay peer={peer} />
    </div>
  );
};

export default VideoPlayer;
