import Axios from "@/api/server";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const data = { email, password };
    try {
      const response = await Axios.post("/api/v1/auth/login", data);
      if (response.status === 200) {
        // set cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", response.data.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
            path: "/", 
          })
        );
        return res.status(200).json({ data: response.data.data });
      }
    } catch (err) {
      return res
        .status(err.response.status)
        .send({ err: err.response.data.err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).send({ err: `Method ${req.method} not allowed` });
  }
};
