import styles from "./../styles/Related.module.scss";
import Card from "@/components/Card";

const RelatedProducts = ({ products }) => {
  return (
    <div className={styles.relatedProducts}>
      <h3>Related Products</h3>
      <div className={styles.products}>
        {products.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
