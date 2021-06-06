import Axios from "@/api/server";
import HomeComponent from "@/components/Home";
import Layout from "@/components/Layout";

export default function Home({ products }) {
  return (
    <>
      <Layout>
        <HomeComponent products={products} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await Axios.get("/api/v1/products");
  return {
    props: {
      products: res.data.data,
    },
  };
}
