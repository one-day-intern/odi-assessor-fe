import React, { useEffect, useState } from "react";
import PreviewRoom from "../PreviewRoom";
import {
  HMSLogLevel,
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import ConferenceRoom from "../ConferenceRoom";
import { useRouter } from "next/router";

interface Props extends React.PropsWithChildren {
  token?: string;
}

const ConferenceWrapper: React.FC<Props> = ({ token }) => {
  const [roomEnded, setRoomEnded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const actions = useHMSActions();
  const inRoom = useHMSStore(selectIsConnectedToRoom);
  const router = useRouter();

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
  }, [isConnected]);

  const endRoom = async () => {
    await actions.endRoom(false, "Room ended by host");
    setRoomEnded(true);
  };

  if (roomEnded) {
    router.push("/");
    return null;
  }

  return (
    <>
      {!inRoom ? (
        <PreviewRoom setIsConnected={setIsConnected} token={token} />
      ) : (
        <ConferenceRoom onEndRoom={endRoom} />
      )}
    </>
  );
};

export default ConferenceWrapper;
