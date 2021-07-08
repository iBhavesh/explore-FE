import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import RequestItem from "../components/Requests/RequestItem";

const RequestPage = () => {
  useEffect(() => {
    document.title = "Explore | Requests";
  }, []);

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
