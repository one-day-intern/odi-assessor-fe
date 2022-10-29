import React from "react";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import ConferenceWrapper from "./ConferenceWrapper/ConferenceWrapper";


const VideoConference = () => {
  return (
    <HMSRoomProvider>
      <ConferenceWrapper token={process.env.NEXT_PUBLIC_HMS_DEV_TOKEN} />
    </HMSRoomProvider>
  );
};

export default VideoConference;
