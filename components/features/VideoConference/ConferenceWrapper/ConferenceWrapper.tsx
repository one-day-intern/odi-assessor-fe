import React, { useEffect, useState } from "react";
import PreviewRoom from "../PreviewRoom";
import {
  HMSLogLevel,
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import ConferenceRoom from "../ConferenceRoom";

interface Props extends React.PropsWithChildren {
  token?: string;
}

const ConferenceWrapper: React.FC<Props> = ({ token }) => {
  const [isConnected, setIsConnected] = useState(false);
  const actions = useHMSActions();
  const inRoom = useHMSStore(selectIsConnectedToRoom);

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
      if (isConnected) {
        leaveConference();
      }
      window.removeEventListener("beforeunload", leaveConference);
      window.removeEventListener("onunload", leaveConference);
    };
    // eslint-disable-next-line
  }, [isConnected]);

  return (
    <>
      {!inRoom ? (
        <PreviewRoom setIsConnected={setIsConnected} token={token} />
      ) : (
        <ConferenceRoom />
      )}
    </>
  );
};

export default ConferenceWrapper;
