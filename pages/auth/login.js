import { useState, useContext } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/Form.module.scss";
import Axios from "@/api/server";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function login() {
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

    const data = { email, password };
    try {
      const res = await Axios.post("/auth/login", data);
      setIsLoading(false);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data.id);
        router.push("/profile/dashboard");
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
      <Layout title="Login">
        <form className={styles.form} onSubmit={onFormSubmit}>
          <h3>Login</h3>
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
          <button type="submit" disabled={isLoading}>
            Login
          </button>
          <p>
            Don't have an account ?{" "}
            <Link href="/auth/signup">
              <a>Signup</a>
            </Link>
          </p>
        </form>
      </Layout>
    </>
  );
}
