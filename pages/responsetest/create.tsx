import { CreateResponseTest } from "@components/features/ResponseTest/Create";
import { PageTemplate } from "@components/shared/layouts/PageTemplate";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import usePostRequest from "@hooks/shared/usePostRequest";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

interface ResponseTest {
  prompt: string;
  subject: string;
  name: string;
  sender: string;
}

const CREATE_RESPONSE_TEST_URI = "/assessment/create/response-test/";

const CreateResponseTestPage: NextPage = () => {
  const { postData, status } = usePostRequest<ResponseTest, ResponseTest>(
    CREATE_RESPONSE_TEST_URI,
    {
      requiresToken: true,
    }
  );

  const router = useRouter();

  const createResponseTestSubmit = async (message: string, subject: string, name: string, sender: string) => {
    const response = await postData({
      prompt: message,
      subject,
      name,
      sender
    });

    if (response instanceof Error) {
      toast.error(response.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000,
      });
      return;
    }

    toast.success("Response test successfully created.", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
      containerId: "root-toast",
      autoClose: 2000,
    });
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <PageTemplate>
        <CreateResponseTest onSubmit={createResponseTestSubmit} status={status!}/>
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default CreateResponseTestPage;
