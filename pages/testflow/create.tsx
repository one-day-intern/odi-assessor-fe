import CreateTestFlow from "@components/features/TestFlow/Create";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import { useAuthContext } from "@context/Authentication";
import useGetRequest from "@hooks/shared/useGetRequest";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CreateTestFlowPage: NextPage = () => {
  const ASSESSMENT_TOOL_LIST_URL = "/assessment/tools/";

  const [assessmentToolList, setAssessmentToolList] = useState<
    AssignmentOption[] | null
  >(null);

  const router = useRouter();

  const { fetchData: fetchAssessmentTool } = useGetRequest<AssessmentTool[]>(
    ASSESSMENT_TOOL_LIST_URL,
    {
      requiresToken: true,
      disableFetchOnMount: true,
    }
  );
  const { accessToken } = useAuthContext();

  useEffect(() => {
    const fetchAsgOptions = async () => {
      const fetchedAssessmentTool = await fetchAssessmentTool();

      if (fetchedAssessmentTool instanceof Error) {
        toast.error(fetchedAssessmentTool.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
          containerId: "root-toast",
          autoClose: 2000,
        });
        return;
      }

      setAssessmentToolList(
        fetchedAssessmentTool?.map((asg) => ({
          value: asg,
          label: asg.name,
        })) ?? []
      );
    };

    fetchAsgOptions();
    // eslint-disable-next-line
  }, [accessToken]);
 
  return (
    <ProtectedRoute>
      <PageTemplate>
        {assessmentToolList != null ? (
          <CreateTestFlow options={assessmentToolList} />
        ) : (
          <></>
        )}
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default CreateTestFlowPage;
