import attemptifyToolAttempt from "./attemptifyToolAttempt";
import calculateSubmittedToolPercentage from "./calculateSubmittedToolPercentage";

describe("attemptifyToolAttempt test suite", () => {
  it("Test if response is converted into desired form", () => {
    const response = [
      {
        "attempt-id": "asfdkjkasdjkalcs",
        start_working_time: new Date("2022-10-05"),
        type: "Assessment Type",
        "tool-data": {
          assessment_id: "id_asjdfkjasfkldsadf",
          name: "Assessment Name",
          description: "jcsdakljaklsdc"
        },
      },
    ];

    const attempts = attemptifyToolAttempt(response);
    expect(attempts.length).toBe(1);
    expect(attempts[0].assessment_id).toBe("id_asjdfkjasfkldsadf");
    expect(attempts[0].name).toBe("Assessment Name");
    expect(attempts[0].type).toBe("Assessment Type");
    expect(attempts[0].description).toBe("jcsdakljaklsdc");

    expect(attempts[0].attempt_id).toBe("asfdkjkasdjkalcs");
  });
});

describe("calculateSubmittedToolPercentage test suite", () => {
  it("Test if percentage is calculated correctly", () => {
    const attempts = [
      {
        attempt_id: "asfdkjkasdjkalcs",

        assessment_id: "id_asjdfkjasfkldsadf",
        name: "Assessment Name",
        type: "Assessment Type",
        description: "jcsdakljaklsdc",
      },
      {
        attempt_id: null,
        start_working_time: new Date("2022-10-05"),
        assessment_id: "id_asjdfkjasfkldsadf",
        name: "Assessment Name",
        type: "Assessment Type",
        description: "jcsdakljaklsdc",
      },
    ];

    expect(calculateSubmittedToolPercentage(attempts)).toBe(50);
  });
});
