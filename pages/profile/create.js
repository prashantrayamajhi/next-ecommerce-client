import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Axios from "@/api/server";
import styles from "@/styles/Form.module.scss";
import { checkAuth } from "@/helper/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Create() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState("");
  const [err, setErr] = useState(null);

  const [config, setConfig] = useState(null);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  if (err) {
    toast.error(err);
  }

  useEffect(() => {
    const token = checkAuth();
    if (token) {
      setConfig({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } else {
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await Axios.get("/api/v1/profile", config);
      setUser(res.data.data);
    };

    const fetchCategories = async () => {
      const res = await Axios.get("/api/v1/category");
      setCategories(res.data.data);
      setCategory(res.data.data[0]._id);
    };

    if (config) {
      fetchProfile();
      fetchCategories();
    }
  }, [config]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { name, price, description, category, img, user: user._id };
    try {
      const res = await Axios.post("/api/v1/products", data, config);
      if (res.status === 201) {
        toast.success("Product added successfully");
        setName("");
        setPrice("");
        setDescription("");
        setImg("");
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setErr(err.response.data.err);
      setErr(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {user && (
        <Layout title="Sell a product">
          <form className={styles.form} onSubmit={onFormSubmit}>
            <h3>Sell A Product</h3>
            <div className={styles.inputWrapper}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="category">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="img">Image URL</label>
              <input
                id="img"
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                rows={5}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>

            <button type="submit" disabled={isLoading}>
              Submit
            </button>
          </form>
        </Layout>
      )}
    </>
  );
}
