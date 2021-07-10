import { Grid } from "@material-ui/core";

import { useAppSelector } from "../../app/hooks";
import CircularIndeterminate from "../UI/CircularIndeterminate";
import NoPostsFound from "./NoPostsFound";
import PostItem from "./PostItem";

const PostList = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const status = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  if (status === "loading") return <CircularIndeterminate />;
  if (error) return <div>{error}</div>;
  if (status === "succeeded" && posts.length === 0) return <NoPostsFound />;
  return (
    <Grid container direction="column" alignItems="center">
      {posts.map((post) => (
        <PostItem singlePost={false} key={post.id} post={post} />
      ))}
    </Grid>
  );
};

export default PostList;
