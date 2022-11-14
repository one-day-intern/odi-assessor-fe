import { emptyValidator } from "@utils/validators/emptyValidator";
import { useState } from "react";

interface CreateResponseItem {
  message: string;
  name: string;
  subject: string;
}

type CreateResponseError = {
  [P in keyof CreateResponseItem]: string;
};

const useCreateResponseForm = () => {
  const [data, setData] = useState<CreateResponseItem>({
    message: "",
    subject: "",
    name: "",
  });

  const [error, setError] = useState<CreateResponseError>({
    message: "",
    subject: "",
    name: "",
  });

  const setDataValue = (key: keyof CreateResponseItem, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setErrorValue = (key: keyof CreateResponseError, value: string) => {
    setError((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    const [isMessageValid, messageError] = emptyValidator(data.message);
    setErrorValue("message", messageError);

    const [isSubjectValid, subjectError] = emptyValidator(data.subject);
    setErrorValue("subject", subjectError);

    const [isNameValid, nameError] = emptyValidator(data.name);
    setErrorValue("name", nameError);

    return isMessageValid && isSubjectValid && isNameValid;
  };

  return { error, data, validate, setErrorValue, setDataValue };
};

export { useCreateResponseForm };
