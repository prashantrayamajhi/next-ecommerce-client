import styles from "@/styles/Product.module.scss";

const SellerDetails = ({ seller }) => {
  return (
    <div className={styles.sellerDetails}>
      <h2>Seller Details</h2>
      <div className={styles.details}>
        <div className={styles.detail}>
          <p>Seller Name</p>
          <p>{seller.name}</p>
        </div>
        <div className={styles.detail}>
          <p>Email Address</p>
          <p>{seller.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
