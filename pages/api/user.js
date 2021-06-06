import Axios from "@/api/server";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      return res.status(403).json({ err: "Not authorized" });
    } else {
      const { token } = cookie.parse(req.headers.cookie);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await Axios.get("api/v1/profile/", config);
        if (response.status === 200) {
          return res.status(200).json({ data: response.data.data });
        }
      } catch (err) {
        return res
          .status(err.response.status)
          .send({ err: err.response.data.err });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).send({ err: `Method ${req.method} not allowed` });
  }
};
