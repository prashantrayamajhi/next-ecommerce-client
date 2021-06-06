import Card from "@/components/Card";
import styles from "@/styles/Home.module.scss";

const Home = ({ products, title = "Latest Products" }) => {
  const mappedProducts = products.map((product, index) => {
    return <Card key={index} product={product} />;
  });
  return (
    <>
      {/* <h2>{title}</h2> */}
      <div className={styles.products}>{mappedProducts}</div>
    </>
  );
};

export default Home;
