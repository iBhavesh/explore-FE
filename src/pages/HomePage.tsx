import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import PostList from "../components/PostList/PostList";
import { fetchAllPosts } from "../features/posts/postsSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Explore";
  }, []);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);
  return <PostList key="homePage" />;
};

export default HomePage;
