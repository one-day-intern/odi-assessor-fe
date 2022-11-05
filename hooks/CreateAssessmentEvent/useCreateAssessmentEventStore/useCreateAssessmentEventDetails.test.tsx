import { renderHook, act } from "@testing-library/react";
import { useCreateAssessmentEventDetails } from "./useCreateAssessmentEventDetails";

describe("Login handler hook test suite", () => {
  it("Test setAssessmentData", () => {
    const { result } = renderHook(() => useCreateAssessmentEventDetails());

    act(() => {
      result.current.setAssessmentData("name", "Rashad's Assessment");
    });

    expect(result.current.assessmentData.name).toBe("Rashad's Assessment");
  });

  it("Test add empty participation", () => {
    const { result } = renderHook(() => useCreateAssessmentEventDetails());

    act(() => {
      result.current.addEmptyParticipation();
    });

    expect(result.current.assessmentData.list_of_participants.length).toBe(1);
  });

  it("Test updateParticipation", () => {
    const { result } = renderHook(() => useCreateAssessmentEventDetails());

    act(() => {
      result.current.addEmptyParticipation();
    });

    const participation = result.current.assessmentData.list_of_participants[0];
    participation.assessee_email = "rashad@rashad.com";
    participation.assessor_email = "johanes@jo.com";

    act(() => {
      result.current.updateParticipation(participation);
    });

    expect(
      result.current.assessmentData.list_of_participants[0].assessee_email
    ).toBe("rashad@rashad.com");
    expect(
      result.current.assessmentData.list_of_participants[0].assessor_email
    ).toBe("johanes@jo.com");
  });

  it("Test validate participation before submit", () => {
    const { result } = renderHook(() => useCreateAssessmentEventDetails());

    act(() => {
      result.current.addEmptyParticipation();
    });

    const participationId =
      result.current.assessmentData.list_of_participants[0].id;
    const participation = {
      assessee_email: "abc@def.com",
      assessor_email: "abc@abc.com",
      id: participationId,
    };

    act(() => {
      result.current.updateParticipation(participation);
    });

    let validation: [
      boolean,
      {
        assesseeEmailError: string;
        assessorEmailError: string;
      }
    ] = [true, { assesseeEmailError: "", assessorEmailError: "" }];

    act(() => {
      validation = result.current.validateParticipationBeforeSubmit(
        "abc@def.com",
        "abc@abc.com"
      );
    });

    expect(validation[0]).toBe(false);
    expect(validation[1].assesseeEmailError).toBe(
      "The assessee has already been assigned to this assessment event."
    );
    expect(validation[1].assessorEmailError).toBe(
      "The assessor has already been assigned to this assessment event."
    );
  });

  it("Test remove participation", () => {
    const { result } = renderHook(() => useCreateAssessmentEventDetails());

    act(() => {
      result.current.addEmptyParticipation();
    });

    const participationId =
      result.current.assessmentData.list_of_participants[0].id;
    const participation = {
      assessee_email: "abc@def.com",
      assessor_email: "abc@abc.com",
      id: participationId,
    };

    act(() => {
        result.current.removeParticipation(participation);
    })

    expect(result.current.assessmentData.list_of_participants.length).toBe(0);
  });

  it("Test setAssessment errors", () => {
    const { result } = renderHook(() => useCreateAssessmentEventDetails());
    
    act(() => {
         result.current.setAssessmentErrors("name", ":(");
    })

    expect(result.current.assessmentErrors.name).toBe(":(")
  })
});
