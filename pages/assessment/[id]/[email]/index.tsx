import AssesseeParticipation from "@components/features/Dashboard/AssesseeParticipation/AssesseeParticipation";
import { ParticipationTimeline } from "@components/features/Dashboard/AssesseeParticipation/ParticipationTimeline";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import useGetRequest from "@hooks/shared/useGetRequest";
import { attemptifyToolAttempt } from "@utils/formatters/attemptDisplayFormatters";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const getOverallAverage = (list?: GradeReportModel[]) => {
  const length = list?.length ?? 0;
  const total = list?.reduce((prev, current) => prev + current.grade, 0) ?? 0;
  return total / length || 0;
}

const AssesseeParticipationPage: NextPage = () => {
  const router = useRouter();
  const { data: progressData, error: progressError } = useGetRequest<
    AttemptResponse[]
  >(
    `/assessment/assessment-event/progress/?assessment-event-id=${router.query.id}&assessee-email=${router.query.email}`,
    { requiresToken: true }
  );

  const { data: gradeData, error: gradeError } = useGetRequest<GradeReportModel[]>(`/assessment/assessment-event/report/?assessment-event-id=${router.query.id}&assessee-email=${router.query.email}`, { requiresToken: true})

  const assessee = {
    name: router.query.email as string,
  };

  return (
    <ProtectedRoute>
      {progressData == null && progressError == null ? (
        <div>Loading</div>
      ) : (
        <PageTemplate>
          <AssesseeParticipation
            endTime={new Date("2022-11-22T21:15:00")}
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
