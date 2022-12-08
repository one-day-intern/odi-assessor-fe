import { AssessmentGrader } from "@components/factories/AssessmentGrader";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import useGetRequest from "@hooks/shared/useGetRequest";
import usePostRequest from "@hooks/shared/usePostRequest";
import {
  attemptifyToolAttempt,
  calculateSubmittedToolPercentage,
} from "@utils/formatters/attemptDisplayFormatters";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

type AssessmentType = "assignment" | "interactivequiz" | "responsetest";

interface RequestData {
  "tool-attempt-id": string;
  grade: number;
  note: string;
}

interface ResponseData {
  tool_attempt_id: string;
  grade: number;
  note: string;
  test_flow_attempt: ToolAttempt;
}

const AssessmentToolPage: NextPage = () => {
  const router = useRouter();

  const urlMap: Record<AssessmentType, string> = {
    assignment: `/assessment/review/assignment/data/?tool-attempt-id=${router.query.attempt_id}`,
    interactivequiz: "",
    responsetest: "",
  };

  const {
    data: progressData,
    error: progressError,
    status: progressStatus,
  } = useGetRequest<AttemptResponse[]>(
    `/assessment/assessment-event/progress/?assessment-event-id=${router.query.id}&assessee-email=${router.query.email}`,
    { requiresToken: true, disableFetchOnMount: false }
  );

  const {
    data: submissionData,
    error: submissionError,
    status: submissionStatus,
  } = useGetRequest<Submission>(urlMap[router.query.type as AssessmentType], {
    requiresToken: true,
    disableFetchOnMount: false,
  });

  const { postData, status } = usePostRequest<RequestData, ResponseData>(
    "/assessment/grade/submit-grade-and-note/",
    { requiresToken: true }
  );



  const toolAttempts = attemptifyToolAttempt(progressData!);

  const grader = async (grade: number, note: string) => {
    const response = await postData({
      "tool-attempt-id": router.query.attempt_id as string,
      grade,
      note,
    });
    
    if (response instanceof Error) {
      toast.error(response.message, {
          containerId: "root-toast",
          position: toast.POSITION.TOP_CENTER,
      });
      return;
  }

    
    

    toast.success("Assignment has been graded.");
    router.push(`/assessment/${router.query.id}/${router.query.email}`);
  }

  const isLoading =
    progressStatus === "loading" || submissionStatus === "loading";
  
  const isInitial = progressStatus === "initial" || submissionStatus === "initial";

  const isError = progressStatus === "error" || submissionStatus === "error";
  
  const assessmentData = progressData?.find(
    (data) => data["attempt-id"] === router.query.attempt_id
  )?.["tool-data"];


  return (
    <>
      {isLoading || isInitial ? (
        <div>Loading</div>
      ) : isError ? (
        <div>{progressError?.message} {submissionError?.message}</div>
        ) : (
        <ProtectedRoute>
          <PageTemplate>
            <AssessmentGrader
            loadingStatus={status!}
            grader={grader}
              type={router.query?.type as AssessmentType}
              submission={submissionData!}
              assessmentData={assessmentData!}
              sidebarMetadata={{
                name: "Someone Else",
                grade: 100,
                attempts: toolAttempts,
                progress: calculateSubmittedToolPercentage(toolAttempts)

              }}
            />
          </PageTemplate>
        </ProtectedRoute>
      )}
    </>
  );
};

export default AssessmentToolPage;
