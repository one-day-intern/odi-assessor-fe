import CreateAssessmentEvent from "@components/features/AssessmentEvent/Create";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import { NextPage } from "next";
import React from "react";

const CreateAssessmentEventPage: NextPage = () => {
  return (
    <PageTemplate>
      <CreateAssessmentEvent />
    </PageTemplate>
  );
};

export default CreateAssessmentEventPage;
