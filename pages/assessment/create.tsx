import CreateAssessmentEvent from "@components/features/AssessmentEvent/Create";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import { useAuthContext } from "@context/Authentication";
import useGetRequest from "@hooks/shared/useGetRequest";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GET_TEST_FLOWS_URL = "/assessment/test-flow/all/";

const CreateAssessmentEventPage: NextPage = () => {
  const { accessToken } = useAuthContext();
  const { fetchData: fetchTestFlowChoices } = useGetRequest<TestFlow[]>(
    GET_TEST_FLOWS_URL,
    {
      requiresToken: true,
      disableFetchOnMount: true,
    }
  );
  const [testFlows, setTestFlows] = useState<TestFlowOption[] | null>(null);

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

    displayTestFlowChoices();
    //eslint-disable-next-line
  }, [accessToken]);
  return (
    <ProtectedRoute>
      <PageTemplate>
          <CreateAssessmentEvent testFlows={testFlows} />
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default CreateAssessmentEventPage;
