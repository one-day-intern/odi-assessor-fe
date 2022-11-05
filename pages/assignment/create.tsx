import { CreateAssignment } from "@components/features/Assignment";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import { NextPage } from "next";
import React from "react";

const CreateAssignmentPage: NextPage = () => {
  return (
    <ProtectedRoute>
      <PageTemplate>
        <CreateAssignment />
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default CreateAssignmentPage;
