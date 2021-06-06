import Layout from "@/components/Layout";
import Axios from "./../../api/server";
import styles from "@/styles/Product.module.scss";

export default function Product({ product }) {
  console.log(product);
  return (
    <>
      <Layout title={product.name} description={product.description}>
        <div className={styles.product}>
          <div className={styles.images}>
            <img src={product.img} alt={product.name} />
          </div>
          <div className={styles.info}>
            <h1>{product.name}</h1>
            <p className={styles.price}>Rs.{product.price}</p>
            <p className={styles.category}>{product.category.name}</p>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.btn}>
              <button>Add To Cart</button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const product = await Axios.get("/api/v1/products/" + params.id);
  return {
    props: {
      product: product.data.data,
    },
  };
}
