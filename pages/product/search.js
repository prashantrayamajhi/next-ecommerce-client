import Layout from "@/components/Layout";
import Axios from "@/api/server";
import HomeComponent from "@/components/Home";
import styles from "@/styles/Products.module.scss";
import { useRouter } from "next/router";

export default function Search({ products }) {
  const router = useRouter();
  return (
    <>
      <Layout title={`Search ${router.query.term}`}>
        {products.length <= 0 ? (
          <h2 className={styles.title}>
            No results found for : {router.query.term}
          </h2>
        ) : (
          <h2 className={styles.title}>
            Search results for : {router.query.term}
          </h2>
        )}
        <div className={styles.search}>
          <HomeComponent
            products={products}
            title={
              products.length > 0
                ? `Search Results For "${router.query.term}"`
                : `No result found for "${router.query.term}"`
            }
          />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { term } = query;
  const res = await Axios.get("/api/v1/products/search/" + term);
  return {
    props: {
      products: res.data.data,
    },
  };
}
