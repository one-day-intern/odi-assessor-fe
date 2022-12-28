import CreateAssessmentEvent from "@components/features/AssessmentEvent/Create";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import { useAuthContext } from "@context/Authentication";
import useGetRequest from "@hooks/shared/useGetRequest";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GET_TEST_FLOWS_URL = "/assessment/test-flow/all/";
const GET_ASSESSORS = "/company/assessors/";

const CreateAssessmentEventPage: NextPage = () => {
  const { accessToken } = useAuthContext();
  const { fetchData: fetchTestFlowChoices } = useGetRequest<TestFlow[]>(
    GET_TEST_FLOWS_URL,
    {
      requiresToken: true,
      disableFetchOnMount: true,
    }
  );
  const { fetchData: fetchAssessors } = useGetRequest<Assessor[]>(
    GET_ASSESSORS,
    {
      requiresToken: true,
      disableFetchOnMount: true,
    }
  );
  const [testFlows, setTestFlows] = useState<TestFlowOption[] | null>(null);
  const [assessorList, setAssessorList] = useState<AssessorOptions[] | null>(
    null
  );

  useEffect(() => {
    if (accessToken === "") return;
    const displayTestFlowChoices = async () => {
      const responseTestFlowChoices = await fetchTestFlowChoices();

      if (responseTestFlowChoices instanceof Error) {
        toast.error(responseTestFlowChoices.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          containerId: "root-toast",
          autoClose: 2000,
        });
        return;
      }

      const choices = responseTestFlowChoices
        .filter((testFlow) => testFlow.is_usable)
        .map((testFlow) => ({
          value: testFlow,
          label: testFlow.name,
        }));

      setTestFlows(choices);
    };

    const displayAssessors = async () => {
      const responseAssessorList = await fetchAssessors();
      if (responseAssessorList instanceof Error) {
        toast.error(responseAssessorList.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          containerId: "root-toast",
          autoClose: 2000,
        });
        return;
      }

      const assessorList = responseAssessorList.map((assessor) => ({
        value: assessor,
        label: assessor.email,
      }));

      setAssessorList(assessorList);
    };

    displayTestFlowChoices();
    displayAssessors();
    //eslint-disable-next-line
  }, [accessToken]);
  return (
    <ProtectedRoute>
      <PageTemplate>
        <CreateAssessmentEvent testFlows={testFlows} assessors={assessorList} />
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default CreateAssessmentEventPage;
