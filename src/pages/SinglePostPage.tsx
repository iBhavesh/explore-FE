import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import PostItem from "../components/PostList/PostItem";
import CircularIndeterminate from "../components/UI/CircularIndeterminate";
type Props = {};

const SinglePostPage = (props: Props) => {
  const params = useParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance.get(`/posts/${params.postId}`).then((response) => {
      setPost(response.data);
      setIsLoading(false);
    });
    // setIsLoading(false);
  }, [params.postId]);

  if (isLoading || post == null) return <CircularIndeterminate />;

  return (
    <Grid container direction="column" alignItems="center">
      <PostItem singlePost={true} key={post.id} post={post} />
    </Grid>
  );
};

export default SinglePostPage;
