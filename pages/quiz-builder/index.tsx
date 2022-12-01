import React from "react";
import type { NextPage } from "next";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import QuizBuilder from "@components/features/QuizBuilder";

const QuizBuilderPage: NextPage = () => {
  return (
    <ProtectedRoute>
        <QuizBuilder />
    </ProtectedRoute>
  );
};

export default QuizBuilderPage;
