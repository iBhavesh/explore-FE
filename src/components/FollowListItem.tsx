import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Button,
} from "@material-ui/core";

const FollowListItem = () => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" />
      </ListItemAvatar>
      <ListItemText primary="Bhavesh Sharma" />
      <ListItemSecondaryAction>
        <Button size="small" variant="outlined">
          UnFollow
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FollowListItem;
