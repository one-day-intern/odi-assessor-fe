import AssesseeParticipation from "@components/features/Dashboard/AssesseeParticipation/AssesseeParticipation";
import { ParticipationTimeline } from "@components/features/Dashboard/AssesseeParticipation/ParticipationTimeline";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import { useAuthContext } from "@context/Authentication";
import useGetRequest from "@hooks/shared/useGetRequest";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface AttemptResponse {
  "attempt-id": string | null;
  start_working_time: string;
  "tool-data": AssessmentTool;
}

const attemptifyToolAttempt = (response: AttemptResponse[]): ToolAttempt[] => {
  return response.map((attempt) => ({
    assessment_id: attempt["tool-data"].assessment_id,
    attempt_id: attempt["attempt-id"],
    name: attempt["tool-data"].name,
    type: attempt["tool-data"].type,
  }));
};

const AssesseeParticipationPage: NextPage = () => {
  const router = useRouter();
  const { data: progressData, error: progressError } = useGetRequest<
    AttemptResponse[]
  >(
    `/assessor/assessment-event/progress/?assessment-event-id=${router.query.id}&assessee-email=${router.query.email}`,
    { requiresToken: true }
  );

  useEffect(() => {
    if (!progressData) return;
    console.log(progressData)
    console.log(attemptifyToolAttempt(progressData))
  }, [progressData])

  const assessee = {
    name: "Rashad Aziz",
  };

  return (
    <ProtectedRoute>
      {progressData == null && progressError == null ? (
        <div>Loading</div>
      ) : (
        <PageTemplate>
          <AssesseeParticipation
            data={assessee}
            tools={attemptifyToolAttempt(progressData!)}
          >
            <ParticipationTimeline
              tools={attemptifyToolAttempt(progressData!)}
            />
          </AssesseeParticipation>
        </PageTemplate>
      )}
    </ProtectedRoute>
  );
};

export default AssesseeParticipationPage;
