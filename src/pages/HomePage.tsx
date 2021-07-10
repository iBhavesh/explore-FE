import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import PostList from "../components/PostList/PostList";
import { fetchFollowRequests } from "../features/follower/followerSlice";
import { fetchAllPosts } from "../features/posts/postsSlice";
import { fetchNotifications } from "../features/notifications/notificationsSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Explore";
  }, []);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchFollowRequests());
    dispatch(fetchNotifications());
  }, [dispatch]);
  return <PostList key="homePage" />;
};

export default HomePage;
