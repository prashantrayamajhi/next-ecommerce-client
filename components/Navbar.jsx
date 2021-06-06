import { useContext, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.scss";
import AuthContext from "./../context/AuthContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);
  const [term, setTerm] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (term.trim().length <= 0) {
      return router.push("/");
    }
    router.push("/product/search?term=" + term);
  };
  const displayNavItems = () => {
    if (user) {
      return (
        <>
          <Link href={"/profile/dashboard"}>
            <a>Dashboard</a>
          </Link>
          <p className={styles.link} onClick={logout}>
            Logout
          </p>
        </>
      );
    } else {
      return (
        <>
          <Link href="/auth/login">
            <a>Login</a>
          </Link>
        </>
      );
    }
  };
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <Link href="/">
            <h3>Next-Shop</h3>
          </Link>
        </div>
        <div className={styles.search}>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search a product"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </form>
        </div>
        <div className={styles.navLinks}>
          <Link href="/">
            <a className={styles.link}>Shop</a>
          </Link>
          {displayNavItems()}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
