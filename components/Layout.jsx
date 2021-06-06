import styles from "@/styles/Layout.module.scss";
import Head from "next/head";
import Navbar from "@/components/Navbar";

const Layout = ({ title, description, keywords, children }) => {
  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  );
};

Layout.defaultProps = {
  title: "Next Shop",
  description: "A minimalist page made in nextjs",
  keywords: "e-commerce, shop",
};

export default Layout;
