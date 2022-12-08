import { rest } from "msw";

export const handlers = [
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/refresh/`,
    (req, res, ctx) => {
      if (req)
        return res(
          ctx.json({
            access: "accesstoken",
            refresh: "refreshtoken",
          })
        );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/`,
    (req, res, ctx) => {
      if (req)
        return res(
          ctx.json({
            access: "accesstoken",
            refresh: "refreshtoken",
          })
        );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/protected/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          message: "Protected route accessed",
        })
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/protected/error/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          message: "Error protected route accessed",
        }),
        ctx.status(400)
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/unprotected/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Unprotected route accessed",
        })
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/unprotected-error/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Error unprotected route accessed",
        }),
        ctx.status(404)
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-info/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          company_id: "cee7f64d-9316-4967-a5a8-770ea40075b8",
          email: "johaneslew@gmail.com",
          company_name: "Tayo Mabok",
          description: "Bus Company",
          address: "Fasilkom UI",
        })
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/unprotected-post/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Unprotected route posted",
        })
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/unprotected-post-error/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Error unprotected route posted",
        }),
        ctx.status(400)
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/protected-post/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          message: "Protected route posted",
        })
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/protected-post/error/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          message: "Error protected route posted",
        }),
        ctx.status(400)
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/assessment/assessment-event/create/`,
    (req, res, ctx) => {
      return res(ctx.json({ event_id: "event id" }));
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/assessment/create/assignment/`,
    (req, res, ctx) => {
      return res(ctx.json({ message: "okay" }));
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/assessment/assessment-event/add-participant/`,
    (req, res, ctx) => {
      return res(ctx.json({ message: "Participant added " }));
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/assessment/review/assignment/file/`,
    (req, res, ctx) => {
      const stringified = JSON.stringify({ unyil: "cuplis" });
      const blob: Blob = new Blob([stringified], { type: "text/plain" });

      return res(
        ctx.body(blob),
        ctx.set({
          "Content-Length": "10",
          "Content-Disposition": `attachment; filename="cuplis.json"`,
          "Access-Control-Expose-Headers": "Content-Dispotion",
        })
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/file/unprotected`,
    (req, res, ctx) => {
      const stringified = JSON.stringify({ unyil: "cuplis" });
      const blob: Blob = new Blob([stringified], { type: "text/plain" });

      return res(
        ctx.body(blob),
        ctx.set({
          "Content-Length": "10",
          "Content-Disposition": `attachment; filename="cuplis.json"`,
          "Access-Control-Expose-Headers": "Content-Dispotion",
        })
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/file/protected`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      const stringified = JSON.stringify({ unyil: "cuplis" });
      const blob: Blob = new Blob([stringified], { type: "text/plain" });

      return res(
        ctx.body(blob),
        ctx.set({
          "Content-Length": "10",
          "Content-Disposition": `attachment; filename="cuplis.json"`,
          "Access-Control-Expose-Headers": "Content-Dispotion",
        })
      );
    }
  ),
  rest.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assessment/grade/submit-grade-and-note/`, (req, res, ctx) => {
    console.log("Test")
    return res(ctx.json({ message: "I'm done" }));
  }),
];
