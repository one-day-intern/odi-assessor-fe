import React, { useEffect, useRef, useState } from "react";
import styles from "./ConferenceWrapper.module.css";
import PreviewRoom from "../PreviewRoom";
import {
  HMSLogLevel,
  HMSNotificationTypes,
  selectIsConnectedToRoom,
  selectIsInPreview,
  useHMSActions,
  useHMSNotifications,
  useHMSStore,
} from "@100mslive/react-sdk";
import ConferenceRoom from "../ConferenceRoom";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import usePostRequest from "@hooks/shared/usePostRequest";
import { Loader } from "@components/shared/elements/Loader";

interface Props extends React.PropsWithChildren {
  token?: string;
}

const ConferenceWrapper: React.FC<Props> = ({ token }) => {
  const [roomEnded, setRoomEnded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const actions = useHMSActions();
  const roomEndedRemotely = useHMSNotifications(
    HMSNotificationTypes.ROOM_ENDED
  );
  const inRoom = useHMSStore(selectIsConnectedToRoom);
  const inPreview = useHMSStore(selectIsInPreview);
  const { postData } = usePostRequest("/video-conference/rooms/lock/", {
    requiresToken: true,
  });
  const router = useRouter();
  const roomEnding = useRef(false);

  useEffect(() => {
    if (roomEndedRemotely && inPreview) {
      roomEnding.current = true;
      toast.info(roomEndedRemotely.data.reason, { containerId: "root-toast" });
      router.push("/");
    }
    // eslint-disable-next-line
  }, [roomEndedRemotely, inPreview]);

  useEffect(() => {
    actions.setLogLevel(HMSLogLevel.NONE);
  }, [actions]);

  useEffect(() => {
    const leaveConference = () => {
      actions.leave();
    };
    window.addEventListener("beforeunload", leaveConference);
    window.addEventListener("onunload", leaveConference);
    return () => {
      if (isConnected && !roomEnded) {
        leaveConference();
      }
      window.removeEventListener("beforeunload", leaveConference);
      window.removeEventListener("onunload", leaveConference);
    };
    // eslint-disable-next-line
  }, [isConnected, roomEnded]);

  const endRoom = async () => {
    roomEnding.current = true;
    await actions.endRoom(false, "Room ended by host");
    if (postData) await postData({ room_id: router.query["room_id"] });
    setRoomEnded(true);
  };

  if (roomEnded) {
    router.push("/");
    return null;
  }

  if (!roomEnding.current) {
    if (!inRoom) {
      return <PreviewRoom setIsConnected={setIsConnected} token={token} />;
    }
    return <ConferenceRoom onEndRoom={endRoom} />;
  }
  return (
    <div className={styles["loader-container"]}>
      <Loader />
    </div>
  );
};

export default ConferenceWrapper;
