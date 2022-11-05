import { AssessorDashboard } from "@components/features/Dashboard/Assessor";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <ProtectedRoute>
      <PageTemplate>
        <AssessorDashboard />
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default Home;
