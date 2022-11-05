import { Multistep } from "@components/shared/layouts/Multistep";
import { useAssessorSignupStepContext } from "@context/Signup/AssessorSignupStepContext";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";
import Error from "next/error";

const AssessorSignup = () => {
  
  const { forms, selectStep, selectedId } = useAssessorSignupStepContext();
  const [routerReady, setRouterReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setRouterReady(router.isReady)
  }, [router.isReady])

  if (!routerReady) {
    return <div></div>
  }


  return (router.query.code != null ?
    <Multistep
      elements={forms}
      selectedId={selectedId}
      selectStep={selectStep}
    /> : <Error statusCode={404}/>
  );
};

export { AssessorSignup };
