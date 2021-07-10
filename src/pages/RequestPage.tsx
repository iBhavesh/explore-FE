import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import RequestItem from "../components/Requests/RequestItem";
import { fetchFollowRequests } from "../features/follower/followerSlice";

const RequestPage = () => {
  const follow_requests = useAppSelector(
    (state) => state.follower.follow_requests
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFollowRequests());
  }, [dispatch]);

  if (follow_requests.length > 0)
    return (
      <Grid container direction="column" alignItems="center">
        {follow_requests.map((req) => (
          <RequestItem key={req.id} follower={req} />
        ))}
      </Grid>
    );

  return (
    <Grid container direction="column" alignItems="center">
      <h2>You have no follow requests</h2>
    </Grid>
  );
};

export default RequestPage;
