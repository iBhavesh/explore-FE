import { Grid } from "@material-ui/core";
import { useAppSelector } from "../app/hooks";
import NoRequestsFound from "../components/Requests/NoRequestFound";
import RequestItem from "../components/Requests/RequestItem";

const RequestPage = () => {
  const follow_requests = useAppSelector(
    (state) => state.follower.follow_requests
  );

  if (follow_requests.length > 0)
    return (
      <Grid container direction="column" alignItems="center">
        {follow_requests.map((req) => (
          <RequestItem key={req.id} follower={req} />
        ))}
      </Grid>
    );

  return <NoRequestsFound />;
};

export default RequestPage;
