import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import PostItem from "../components/PostList/PostItem";
import CircularIndeterminate from "../components/UI/CircularIndeterminate";
import { Post } from "../features/posts/postsSlice";
type Props = {};

const SinglePostPage = (props: Props) => {
  const params = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (post == null) document.title = "Explore | Single Post";
    else
      document.title = `Explore | ${
        post!.caption.length > 0 ? post!.caption : "Single Post"
      }`;
  }, [post]);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(`/posts/${params.postId}`)
      .then((response) => {
        setPost(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, [params.postId]);

  if (isLoading || post == null) return <CircularIndeterminate />;

  return (
    <Grid container direction="column" alignItems="center">
      <PostItem singlePost={true} key={post.id} post={post} />
    </Grid>
  );
};

export default SinglePostPage;
