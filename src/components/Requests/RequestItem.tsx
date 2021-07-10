import { Avatar, Card, Grid, Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { blue } from "@material-ui/core/colors";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { Follower } from "../../features/follower/followerSlice";
import AcceptButton from "./AcceptButton";
import DeclineButton from "./DeclineButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        width: 500,
      },
    },
    avatar: {
      backgroundColor: blue[800],
    },
  })
);

type Props = {
  follower: Follower;
};

const RequestItem = (props: Props) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (props.follower.profile_picture !== null) {
      axiosInstance.get(props.follower.profile_picture).then((response) => {
        setImageUrl(response.data.url);
      });
    }
  }, [props.follower.profile_picture]);

  return (
    <Grid item>
      <Card className={classes.root}>
        <Avatar className={classes.avatar} src={imageUrl ?? ""} />
        <div
          style={{
            // display: "flex",
            // flexDirection: "column",
            marginLeft: 8,
          }}
        >
          <Link
            component={RouterLink}
            to={`/user/${props.follower.id}`}
            variant="subtitle2"
          >
            {props.follower.first_name + " " + props.follower.last_name}
          </Link>{" "}
          <Typography component="span" variant="body2">
            wants to follow you
          </Typography>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ display: "flex" }}>
          <AcceptButton id={props.follower.id} />
          <DeclineButton id={props.follower.id} />
        </div>
      </Card>
    </Grid>
  );
};

export default RequestItem;
