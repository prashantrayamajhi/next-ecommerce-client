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
  const [stock, setStock] = useState(5);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState([]);
  const [displayImg, setDisplayImg] = useState([]);
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

  const image = [];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((img) => {
      img = URL.createObjectURL(img);
      image.push(img);
    });
    setImg(files);
    setDisplayImg(image);
  };

  const handleRemoveImage = (newImg) => {
    setDisplayImg(displayImg.filter((image) => image !== newImg));
    newImg = [newImg];
    let updatedImg = newImg.filter(
      (image) => img.indexOf(image) !== displayImg.indexOf(img)
    );
    if (updatedImg || updatedImg.length <= 0) {
      updatedImg = [];
    }
    setImg(updatedImg);
  };

  const mappedDisplayImage = displayImg?.map((img, index) => {
    return (
      <img
        key={index}
        src={img}
        alt=""
        onClick={() => {
          handleRemoveImage(img);
        }}
      />
    );
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await Axios.get("/api/v1/profile", config);
      setUser(res.data.data);
    };

    const fetchCategories = async () => {
      const res = await Axios.get("/api/v1/categories");
      setCategories(res.data.data);
      res.data.data.length > 0 && setCategory(res.data.data[0]._id);
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
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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

            <div className={styles.inputWrapper}>
              <label htmlFor="img">Images</label>
              <input
                type="file"
                name="img"
                multiple
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />

              {displayImg.length > 0 && (
                <div className={styles.displayImg}>{mappedDisplayImage}</div>
              )}
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
