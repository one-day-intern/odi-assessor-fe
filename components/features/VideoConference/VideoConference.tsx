import React from "react";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import ConferenceWrapper from "./ConferenceWrapper/ConferenceWrapper";

interface Props {
  token?: string;
}

const VideoConference: React.FC<Props> = ({ token }) => {
  return (
    <HMSRoomProvider>
      <ConferenceWrapper token={token} />
    </HMSRoomProvider>
  );
};

export default VideoConference;
