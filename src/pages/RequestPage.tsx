import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import RequestItem from "../components/Requests/RequestItem";
import { fetchFollowRequests } from "../features/follower/follower-actions";

const RequestPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Explore | Requests";
    dispatch(fetchFollowRequests());
  }, [dispatch]);

  return (
    <Grid container direction="column" alignItems="center">
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
    </Grid>
  );
};

export default RequestPage;
