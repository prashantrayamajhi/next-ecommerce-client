import { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.scss";
import Link from "next/link";
import Axios from "@/api/server";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  if (error) {
    toast.error(error);
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { name, email, password };
    try {
      const res = await Axios.post("/auth/signup", data);
      setIsLoading(false);
      if (res.status === 201) {
        router.push("/auth/login");
      }
    } catch (err) {
      setError(err.response.data.err);
      setError(null);
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <Layout title="Signup">
        <form className={styles.form} onSubmit={onFormSubmit}>
          <h3>Signup</h3>
          <div className={styles.inputWrapper}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading ? true : false}>
            Signup
          </button>
          <p>
            Already have an account ?{" "}
            <Link href="/auth/login">
              <a>Login</a>
            </Link>
          </p>
        </form>
      </Layout>
    </>
  );
}
