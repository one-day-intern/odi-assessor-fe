import { Button } from "@components/shared/elements/Button";
import { LockIcon } from "@components/shared/svg/LockIcon";
import { UnlockIcon } from "@components/shared/svg/UnlockIcon";
import useGetRequest from "@hooks/shared/useGetRequest";
import usePostRequest from "@hooks/shared/usePostRequest";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./AssessmentParticipationCard.module.css";

interface VideoConference {
  room_id: string;
  conference_in_assessment_event: string;
  conference_host: string;
  conference_assessee: string;
  room_opened: boolean;
}

interface VideoConferenceRequest {
  assessment_event_id: string;
  conference_assessee_email: string;
  initiate: boolean;
  purge?: boolean;
}

const AssessmentParticipationCard = ({
  assesseeName,
  assesseeEmail,
  assessmentEventId,
}: AssessmentEventParticipation) => {
  const { data: roomData, fetchData } = useGetRequest<VideoConference>(
    `/video-conference/rooms/get/by-participation/?assessment_event_id=${assessmentEventId}&conference_assessee_email=${assesseeEmail}`,
    { requiresToken: true }
  );
  const { postData } = usePostRequest<VideoConferenceRequest, VideoConference>(
    "/video-conference/rooms/initiate/",
    { requiresToken: true }
  );
  const router = useRouter();

  const toggleRoomVideo = async () => {
    const response = await postData({
      assessment_event_id: assessmentEventId,
      conference_assessee_email: assesseeEmail,
      initiate: !roomData?.room_opened,
      purge: true,
    });
    if (response instanceof Error) {
      return;
    }
    fetchData();
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={styles["assessment-card"]}
      data-testid="card"
    >
      <h2 className={styles["assessment-card__heading"]}>{assesseeName}</h2>

      <div className={styles["assessment-card__div"]}>
        <Link href={`/assessment/${assessmentEventId}/${assesseeEmail}`}>
          <Button
            type="button"
            variant="primary"
            style={{
              margin: 0,
              width: "fit-content",
              padding: "0.5rem 3rem",
            }}
          >
            <p>View</p>
          </Button>
        </Link>

        <div className={styles["group-lock"]}>
          <button className={styles["lock-button"]} onClick={toggleRoomVideo}>
            {!roomData?.room_opened ? (
              <LockIcon height={20} width={20} color={"#3d65d8"} />
            ) : (
              <UnlockIcon height={20} width={20} color={"#3d65d8"} />
            )}
          </button>
          <Button
            style={{
              margin: 0,
              width: "fit-content",
            }}
            disabled={!roomData?.room_id || !roomData?.room_opened}
            variant="secondary"
            onClick={() => router.push(`/video-conference/?room_id=${roomData?.room_id}`)}
          >
            <p>Start Conference</p>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AssessmentParticipationCard;
