import { useState, useContext } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/Form.module.scss";
import Axios from "@/api/server";
import AuthContext from "./../../context/AuthContext";

export default function login() {
  const { login, error } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    login({ email, password, setIsLoading });
  };
  return (
    <>
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
