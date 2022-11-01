import React, { useEffect, useRef } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectIsInPreview,
  selectLocalPeer,
  selectIsConnectedToRoom,
  useHMSNotifications,
  HMSNotificationTypes,
} from "@100mslive/react-sdk";
import styles from "./PreviewRoom.module.css";
import { motion } from "framer-motion";
import { Loader } from "@components/shared/elements/Loader";
import { Button } from "@components/shared/elements/Button";
import VideoPlayer from "../VideoPlayer";
import Controls from "../Controls";
import { useAuthContext } from "@context/Authentication";
import { useRouter } from "next/router";
import useGetRequest from "@hooks/shared/useGetRequest";
import { toast } from "react-toastify";

interface Props extends React.PropsWithChildren {
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  token?: string;
}

const PreviewRoom: React.FC<Props> = ({ token, setIsConnected }) => {
  const isConnecting = useRef(false);
  const localPeer = useHMSStore(selectLocalPeer);
  const actions = useHMSActions();
  const inPreview = useHMSStore(selectIsInPreview);
  const inRoom = useHMSStore(selectIsConnectedToRoom)
  const { user } = useAuthContext();
  const fullName = `${user?.first_name} ${user?.last_name}`
  const router = useRouter();
  const { fetchData, error } = useGetRequest<{ token: string }>(
    `/video-conference/rooms/join/assessor/?room_id=${router.query["room_id"]}`,
    { requiresToken: true }
  );
  const joining = useRef(false);

  useEffect(() => {
    if (!inPreview && !isConnecting.current && !joining.current && !inRoom && token) {
      isConnecting.current = true;
      actions.preview({ authToken: token, userName: fullName });
    } else if (inPreview) {
      isConnecting.current = false;
      setIsConnected(true);
    }
    // eslint-disable-next-line
  }, [inPreview, inRoom, token]);

  useEffect(() => {
    if (error && joining.current) {
      toast.error(error.message, { containerId: 'root-toast' });
      router.push("/");
    }
  }, [error, router])

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
              onClick={async () => {
                if (token && fetchData) {
                  joining.current = true;
                  await fetchData();
                  actions.join({ authToken: token, userName: fullName });
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
