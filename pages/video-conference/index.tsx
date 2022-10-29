import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const VideoConference = dynamic(
  async () => await import("@components/features/VideoConference"),
  { ssr: false }
);

const VideoConferencePage: NextPage = () => {
  return <VideoConference />;
};

export default VideoConferencePage;
