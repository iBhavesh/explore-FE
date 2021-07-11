import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { blue } from "@material-ui/core/colors";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { Notification } from "../../features/notifications/notificationsSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      "&:hover": {
        backgroundColor: "#f0f0f0 ",
        cursor: "pointer",
      },
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
  notification: Notification;
};

const NotificationItem = (props: Props) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const history = useHistory();
  const createdAt = new Date(props.notification.created_at);

  useEffect(() => {
    if (props.notification.actor.profile_picture !== null) {
      axiosInstance
        .get(props.notification.actor.profile_picture)
        .then((response) => {
          setImageUrl(response.data.url);
        });
    }
  }, [props.notification.actor.profile_picture]);

  let type = "";

  if (props.notification.type === "comment_reaction") {
    type = "reacted to your comment";
  } else if (props.notification.type === "comment") {
    type = "commmented on your post";
  } else if (props.notification.type === "post_reaction") {
    type = "reacted to your post";
  }

  return (
    <Grid item>
      <Card
        className={classes.root}
        onClick={() => {
          history.push(`/posts/${props.notification.post}`);
        }}
      >
        <Avatar className={classes.avatar} src={imageUrl ?? ""} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 8,
          }}
        >
          <div>
            <Typography
              component="span"
              // component={RouterLink}
              // to={`/user/${props.notification.actor.id}`}
              variant="subtitle2"
            >
              {props.notification.actor.first_name +
                " " +
                props.notification.actor.last_name}
            </Typography>{" "}
            <Typography component="span" variant="body2">
              {type}
            </Typography>
          </div>
          <Typography color="textSecondary" variant="caption">
            {createdAt.toLocaleString([], {
              month: "long",
              year: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Typography>
        </div>
      </Card>
    </Grid>
  );
};

export default NotificationItem;
