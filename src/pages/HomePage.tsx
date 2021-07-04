import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axiosInstance from "../axios";

const HomePage = () => {
  useEffect(() => {
    axiosInstance
      .get("posts/")
      .then((response) => {
        console.dir(response);
      })
      .catch((e) => {
        console.dir(e);
      });
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Explore</title>
      </Helmet>
      <div>
        <h2>Hello there! Welcome to front page.</h2>
      </div>
    </HelmetProvider>
  );
};

export default HomePage;
