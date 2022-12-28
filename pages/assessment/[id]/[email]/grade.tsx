import { GradeReport } from "@components/features/GradeReport";
import { Loader } from "@components/shared/elements/Loader";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const GradePage = () => {
  const router = useRouter();
  const { data, error, status } = useGetRequest<GradeReportModel[]>(
    `/assessment/assessment-event/report/?assessment-event-id=${router.query.id}&assessee-email=${router.query.email}`,
    { requiresToken: true }
  );

  useEffect(() => {
    if (status !== "error") return;
    toast.error(error?.message);
  }, [status, error]);
  return (
    <>
      {status === "loading" ? (
        <div className="loader-parent"><Loader/></div>
      ) : (
        <ProtectedRoute>
          <PageTemplate>
            <GradeReport
              assesseeEmail={router.query.email as string}
              listOfGrades={data!}
            />
          </PageTemplate>
        </ProtectedRoute>
      )}
    </>
  );
};

export default GradePage;
