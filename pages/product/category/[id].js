import Layout from "@/components/Layout";
import Axios from "../../../api/server";

export default function Category({ products }) {
  console.log(products);
  return (
    <>
      <Layout>
        <h1>Category</h1>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const products = await Axios.get("/api/v1/products/category/" + params.id);
  return {
    props: {
      products: products.data.data,
    },
  };
}
