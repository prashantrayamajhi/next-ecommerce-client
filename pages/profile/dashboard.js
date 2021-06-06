import Layout from "@/components/Layout";
import Axios from "@/api/server";
import cookie from "cookie";
import styles from "@/styles/Dashboard.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function dashboard({ user, products, config }) {
  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `/api/v1/products/${user._id}/${id}`,
        config
      );
      if (res.status === 200) {
        toast.success("Product deleted successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  let sn = 0;
  return (
    <>
      <ToastContainer />
      <Layout title={user.name}>
        <div className={styles.tableWrapper}>
          <h1>{user && user.name}</h1>
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                sn++;
                return (
                  <tr key={index}>
                    <td>{sn}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <span>Edit</span> |{" "}
                      <span
                        onClick={() => {
                          handleDelete(product._id);
                        }}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  if (!req.headers.cookie || "") {
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  }
  const { token } = cookie.parse(req.headers.cookie);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = await Axios.get("/api/v1/profile", config);
  const products = await Axios.get("/api/v1/profile/products", config);

  return {
    props: {
      user: res.data.data,
      products: products.data.data,
      config,
    },
  };
}
