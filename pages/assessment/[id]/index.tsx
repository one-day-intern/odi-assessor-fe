import { ListOfAssessees } from "@components/features/Dashboard/ListOfAssessees";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import { useAuthContext } from "@context/Authentication";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AssessmentEventParticipationRequest {
  email: string;
  first_name: string;
  last_name: string;
}

const ListOfAssesseePage = () => {
  const router = useRouter();
  const assessmentEventId = router.query.id;
  const { fetchData } = useGetRequest<AssessmentEventParticipationRequest[]>(
    `/assessor/assessee-list/?assessment-event-id=${assessmentEventId}`,
    { requiresToken: true, disableFetchOnMount: true }
  );
  const { user } = useAuthContext();
  const [assessees, setAssessees] = useState<AssessmentEventParticipation[]>(
    []
  );

  useEffect(() => {
    const fetchAssessees = async () => {
      const response = await fetchData();
      if (response instanceof Error) {
        toast.error(response.message);
        return;
      }
      const assesseesTransformed: AssessmentEventParticipation[] =
        response?.map((assesee) => ({
          assesseeEmail: assesee.email,
          assesseeName: `${assesee.first_name} ${assesee.last_name}`,
          assessmentEventId: assessmentEventId as string,
        })) ?? [];
      setAssessees(assesseesTransformed);
    };

    fetchAssessees();
    // eslint-disable-next-line
  }, [user]);

  return (
    <PageTemplate>
      <ListOfAssessees assessees={assessees} />
    </PageTemplate>
  );
};

export default ListOfAssesseePage;
