import { useState, useEffect } from "react";
import Axios from "@/api/server";
import HomeComponent from "@/components/Home";
import Layout from "@/components/Layout";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await Axios.get("/products");
      setProducts(res.data.data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Layout>
        <HomeComponent products={products} />
      </Layout>
    </>
  );
}
