import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../axios";
import CircularIndeterminate from "../UI/CircularIndeterminate";
import PostItem from "./PostItem";

const PostList = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axiosInstance.get("posts/").then((response: any) => {
      setPostList(response.data);
    });
    setIsLoading(false);
  }, []);
  if (isLoading) return <CircularIndeterminate />;
  return (
    <Grid container direction="column" alignItems="center">
      {postList.map((post) => (
        <PostItem singlePost={false} key={post.id} post={post} />
      ))}
    </Grid>
  );
};

export default PostList;
