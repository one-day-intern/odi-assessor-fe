import CreateTestFlow from "@components/features/TestFlow/Create";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import { NextPage } from "next";
import React from "react";

const CreateTestFlowPage: NextPage = () => {
  return (
    <PageTemplate>
      <CreateTestFlow />
    </PageTemplate>
  );
};

export default CreateTestFlowPage;
