import { OneTimeCode } from "@components/features/OneTimeCode";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import React from "react";

const OneTimeCodePage = () => {
  return (
    <ProtectedRoute>
      <PageTemplate>
        <OneTimeCode />
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default OneTimeCodePage;
