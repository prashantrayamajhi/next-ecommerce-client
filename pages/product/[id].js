import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Axios from "./../../api/server";
import SellerDetails from "@/components/SellerDetails";
import RelatedProducts from "@/components/RelatedProducts";
import styles from "@/styles/Product.module.scss";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";

export default function Product() {
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product) {
      const imgArr = [];
      product.images.map((img) => {
        imgArr.push({
          original: img,
          thumbnail: img,
        });
      });
      setImages(imgArr);
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await Axios.get("/products/" + router.query.id);
      console.log(res.data.data);
      setProduct(res.data.data);
    };
    const fetchRelatedProducts = async () => {
      const res = await Axios.get(
        "/products/related/" +
          router.query.id +
          "/" +
          product.data.data.category._id
      );
      setRelatedProducts(res.data.data);
    };

    if (router.query.id) {
      fetchProduct();
    }
    // if (product) {
    //   fetchRelatedProducts();
    // }
  }, [router.query.id]);

  return (
    <>
      {product && (
        <Layout title={product.name} description={product.description}>
          <div className={styles.product}>
            <div className={styles.images}>
              {images && (
                <ImageGallery
                  items={images}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showThumbnails={false}
                  showBullets={true}
                />
              )}
            </div>
            <div className={styles.info}>
              <h1>{product.name}</h1>
              <p className={styles.price}>Rs.{product.price}</p>
              {/* <p className={styles.category}>{product.category.name}</p> */}
              <p className={styles.description}>{product.stock} in stock</p>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.btn}>
                <button>Add To Cart</button>
              </div>
            </div>
          </div>
          <SellerDetails seller={product.user} />
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} />
          )}
        </Layout>
      )}
    </>
  );
}
