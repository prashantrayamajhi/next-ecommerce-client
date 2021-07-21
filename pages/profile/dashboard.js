import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Axios from "@/api/server";
import styles from "@/styles/Dashboard.module.scss";
import { checkAuth } from "@/helper/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";

export default function dashboard() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [config, setConfig] = useState(null);
  const router = useRouter()

  useEffect(() => {
    const token = checkAuth();
    if(token){
      setConfig({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }else{
      router.push('/auth/login')
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await Axios.get("/api/v1/profile", config);
      setUser(res.data.data);
    };

    const fectchProducts = async () => {
      const res = await Axios.get("/api/v1/profile/products", config);
      setProducts(res.data.data);
    };

    if (config) {
      fetchProfile();
      fectchProducts();
    }
  }, [config]);

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
      {user && (
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
                {products &&
                  products.map((product, index) => {
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
      )}
    </>
  );
}
