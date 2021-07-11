import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import axiosInstance from "../axios";
import {
  Follower,
  removeFollower,
  unfollowUser,
} from "../features/follower/followerSlice";
import { User } from "../features/user/userSlice";

type Props = {
  isFollower?: boolean;
  item: Follower;
  currentUser: number;
  user: User;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemText: {
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
  })
);

const FollowListItem = (props: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (props.item.profile_picture !== null) {
      axiosInstance.get(props.item.profile_picture).then((response) => {
        setImageUrl(response.data.url);
      });
    }
  }, [props.item.profile_picture]);

  const handleTitleClick = () => {
    history.push(`/user/${props.item.id}`);
  };

  const handleButtonClick = () => {
    if (props.currentUser !== props.user.id) return;
    setIsClicked(true);
    if (props.isFollower) {
      dispatch(removeFollower(props.item.id));
    } else {
      dispatch(unfollowUser(props.item.id));
    }
  };

  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={imageUrl ?? ""} />
      </ListItemAvatar>
      <ListItemText
        onClick={handleTitleClick}
        className={classes.listItemText}
        primary={`${props.item.first_name} ${props.item.last_name}`}
      />
      {props.user.id === props.currentUser ? (
        <ListItemSecondaryAction>
          {isClicked ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 30px",
              }}
            >
              <CircularProgress size={25} />
            </div>
          ) : (
            <Button onClick={handleButtonClick} size="small" variant="outlined">
              {props.isFollower ? "Remove" : "Unfollow"}
            </Button>
          )}
        </ListItemSecondaryAction>
      ) : null}
    </ListItem>
  );
};

export default FollowListItem;
