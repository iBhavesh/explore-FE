import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Button,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../axios";
import { Follower } from "../features/follower/followerSlice";
type Props = {
  isFollower?: boolean;
  user: Follower;
};

const FollowListItem = (props: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (props.user.profile_picture !== null) {
      axiosInstance.get(props.user.profile_picture).then((response) => {
        setImageUrl(response.data.url);
      });
    }
  }, [props.user.profile_picture]);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={imageUrl ?? ""} />
      </ListItemAvatar>
      <ListItemText
        primary={`${props.user.first_name} ${props.user.last_name}`}
      />
      <ListItemSecondaryAction>
        <Button size="small" variant="outlined">
          {props.isFollower ? "Unfollow" : "Remove"}
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FollowListItem;
