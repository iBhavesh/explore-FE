import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PostList from "../components/PostList/PostList";
import { fetchUserPosts } from "../features/posts/postsSlice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.auth.accessToken!.user_id);

  useEffect(() => {
    document.title = "Explore | Profile";
  }, []);

  useEffect(() => {
    dispatch(fetchUserPosts(user_id));
  }, [dispatch, user_id]);

  return <PostList key="postList" />;
};

export default ProfilePage;
