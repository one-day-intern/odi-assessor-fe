import { AssessorDetails } from "@components/features/AssessorSignup/AssessorDetails";
import { AssessorPassword } from "@components/features/AssessorSignup/AssessorPassword";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

interface AssessorSignupStepProps {
  children: ReactNode;
  googleLoginCallback: () => void;
}

const AssessorSignupStepContext = createContext({} as AssessorSignupStepState);

const AssessorSignupStepProvider = ({
  children,
  googleLoginCallback,
}: AssessorSignupStepProps) => {
  const multistepForm: MultistepForm[] = useMemo(
    () => [
      {
        id: 1,
        name: "Your details",
        description: "Input your personal details",
        reactElement: <AssessorDetails googleLogin={googleLoginCallback} />,
        isSelected: true,
        disabled: false,
      },
      {
        id: 2,
        name: "Your password",
        description: "Create a password for your account",
        reactElement: <AssessorPassword googleLogin={googleLoginCallback} />,
        isSelected: false,
        disabled: true,
      },
    ],
    [googleLoginCallback]
  );

  const [forms, setForms] = useState<MultistepForm[]>(multistepForm);
  const [lastEnabledInd, setLastEnabledInd] = useState(1);
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    setForms((prevState) =>
      prevState.map((form) => {
        const newForm = form;
        form.isSelected = form.id === selectedId ? true : false;
        form.disabled = form.id <= selectedId ? false : true;
        return newForm;
      })
    );
  }, [lastEnabledInd, selectedId]);

  const selectStep = (id: number) => {
    if (id > lastEnabledInd) setLastEnabledInd(id);
    setSelectedId(id);
  };

  return (
    <AssessorSignupStepContext.Provider
      value={{ forms, selectStep, selectedId, lastEnabledInd }}
    >
      {children}
    </AssessorSignupStepContext.Provider>
  );
};

export { AssessorSignupStepProvider, AssessorSignupStepContext };
