import Axios from "@/api/server";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const data = { name, email, password };
    try {
      const response = await Axios.post("/api/v1/auth/signup", data);
      if (response.status === 201) {
        return res.status(201).json({ data: response.data.data });
      }
    } catch (err) {
      res.status(err.response.status).json({ err: err.response.data.err });
    }
  } else {
    res.status(405).send({ err: `Method ${req.method} not allowed` });
  }
};
