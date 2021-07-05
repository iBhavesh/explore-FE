import { Helmet, HelmetProvider } from "react-helmet-async";
import PostList from "../components/PostList/PostList";

const HomePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Explore</title>
      </Helmet>
      <PostList />
    </HelmetProvider>
  );
};

export default HomePage;
