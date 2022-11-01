import React, { useEffect } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useGetRequest from "@hooks/shared/useGetRequest";
import { toast } from "react-toastify";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";

const VideoConference = dynamic(
  async () => await import("@components/features/VideoConference"),
  { ssr: false }
);

const VideoConferencePage: NextPage = () => {
  const router = useRouter();
  const { data, error } = useGetRequest<{ token: string }>(
    `/video-conference/rooms/join/assessor/?room_id=${router.query["room_id"]}`,
    { requiresToken: true }
  );

  useEffect(() => {
    if (router.isReady) {
      if (error) {
        toast.error(error.message, {
          toastId: "error-room",
          containerId: "root-toast",
        });
        router.push("/");
        return;
      } else if (!router.query["room_id"]) {
        toast.error("Invalid room id", {
          toastId: "invalid-room",
          containerId: "root-toast",
        });
        router.push("/");
        return;
      }
    }
  }, [error, router]);

  return (
    <ProtectedRoute>
      {data && <VideoConference token={data.token} />}
    </ProtectedRoute>
  );
};

export default VideoConferencePage;
