import { useState, useContext } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.scss";
import Link from "next/link";

import AuthContext from "./../../context/AuthContext";

export default function signup() {
  const { signup, error } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    signup({ name, email, password, setIsLoading });
  };

  return (
    <>
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
