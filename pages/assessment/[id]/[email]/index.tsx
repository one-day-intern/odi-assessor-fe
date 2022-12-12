import AssesseeParticipation from "@components/features/Dashboard/AssesseeParticipation/AssesseeParticipation";
import { ParticipationTimeline } from "@components/features/Dashboard/AssesseeParticipation/ParticipationTimeline";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import useGetRequest from "@hooks/shared/useGetRequest";
import { attemptifyToolAttempt } from "@utils/formatters/attemptDisplayFormatters";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

interface EventData {
  end_date_time: string;
}

const getOverallAverage = (list?: GradeReportModel[]) => {
  const length = list?.length ?? 0;
  const total = list?.reduce((prev, current) => prev + current.grade, 0) ?? 0;
  return total / length || 0;
};

const AssesseeParticipationPage: NextPage = () => {
  const router = useRouter();
  const { data: progressData, error: progressError } = useGetRequest<
    AttemptResponse[]
  >(
    `/assessment/assessment-event/progress/?assessment-event-id=${router.query.id}&assessee-email=${router.query.email}`,
    { requiresToken: true }
  );

  const { data: eventData, error: eventError } = useGetRequest<EventData>(
    `/assessment/assessment-event/get-data/?assessmment-event-id=${router.query.id}`,
    { requiresToken: true }
  );

  const { data: gradeData, error: gradeError } = useGetRequest<
    GradeReportModel[]
  >(
    `/assessment/assessment-event/report/?assessment-event-id=${router.query.id}&assessee-email=${router.query.email}`,
    { requiresToken: true }
  );

  const assessee = {
    name: router.query.email as string,
  };

  return (
    <ProtectedRoute>
      {(progressData == null && progressError == null) ||
      (eventData == null && eventError == null) ||
      (gradeData == null && gradeError == null) ? (
        <div>Loading</div>
      ) : (
        <PageTemplate>
          <AssesseeParticipation
            endTime={new Date(eventData?.end_date_time!)}
            data={assessee}
            tools={attemptifyToolAttempt(progressData!)}
            grade={getOverallAverage(gradeData)}
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
