import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PostList from "../components/PostList/PostList";
import ProfileHead from "../components/Profile/ProfileHead";
import CircularIndeterminate from "../components/UI/CircularIndeterminate";
import {
  fetchFollowedByUserStatus,
  fetchFollowers,
  fetchFollowing,
} from "../features/follower/follower-actions";
import { fetchUserPosts } from "../features/posts/postsSlice";
import { fetchUser } from "../features/user/userSlice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const userStatus = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    document.title = "Explore | Profile";
  }, []);

  useEffect(() => {
    dispatch(fetchUserPosts(+userId));
    dispatch(fetchFollowers(+userId));
    dispatch(fetchFollowing(+userId));
    dispatch(fetchUser(+userId));
    dispatch(fetchFollowedByUserStatus(+userId));
  }, [dispatch, userId]);

  if (userStatus === "loading") return <CircularIndeterminate />;
  if (error) return <Typography variant="h5">User Not Found</Typography>;

  return (
    <>
      <ProfileHead />
      {user?.is_private_profile ? (
        <div>Profile is Private</div>
      ) : (
        <PostList key="postList" />
      )}
    </>
  );
};

export default ProfilePage;
