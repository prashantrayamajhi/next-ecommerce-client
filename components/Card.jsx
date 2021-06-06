import styles from "@/styles/Card.module.scss";
import Image from "next/image";
import Link from "next/link";

const Card = ({ product }) => {
  return (
    <div className={styles.card}>
      {/* <Image src={product.img} height={230} width={200} /> */}
      <Link href={`/product/${product._id}`}>
        <img src={product.img} alt={product.name} />
      </Link>
      <div className={styles.details}>
        <Link href={`/product/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>Rs.{product.price}</p>
        <Link href={`/product/${product._id}`}>
          <button>View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
