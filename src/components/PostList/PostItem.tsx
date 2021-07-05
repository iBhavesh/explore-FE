import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import {
  FavoriteBorderRounded,
  FavoriteRounded,
  Delete,
} from "@material-ui/icons";
import { useEffect } from "react";
import axiosInstance from "../../axios";
import { useAppSelector } from "../../app/hooks";
import { Menu } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";

type Props = {
  post: any;
  singlePost: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        width: 500,
      },
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: blue[800],
    },
    title: {
      cursor: "pointer",
      width: "fit-content",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    list: {
      width: "100%",
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.up("sm")]: {
        maxWidth: 450,
      },
    },
    inline: {
      display: "inline",
    },
  })
);

const PostItem = ({ post, singlePost }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isInitial, setIsInitial] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const user_id = useAppSelector((state) => state.auth.accessToken?.user_id);
  const [isLiked, setIsLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const createdAt = new Date(post.created_at);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const isMenuOpen = Boolean(menuAnchorEl);

  useEffect(() => {
    if (isInitial) {
      for (let index = 0; index < post.post_reaction.length; index++) {
        const element = post.post_reaction[index];
        if (element.author === user_id) setIsLiked(true);
      }
      setIsInitial(false);
      setLikeCount(post.post_reaction.length);
    }
  }, [post.post_reaction, isInitial, setIsLiked, user_id, setLikeCount]);

  useEffect(() => {
    if (post.media_type === "image" || post.media_type === "video")
      axiosInstance
        .get(post.media)
        .then((response) => {
          setImageUrl(response.data.url);
        })
        .catch((e) => {
          setIsImageLoading(false);
        });
    if (post.author.profile_picture)
      axiosInstance.get(post.media).then((response) => {
        setAvatarUrl(response.data.url);
      });
  }, [post.media, post.author.profile_picture, post.media_type]);

  const handleTitleClick = () => {
    console.log("Title clicked");
  };

  const handleFavouriteClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      axiosInstance.delete("posts/" + post.id + "/reaction");
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      axiosInstance.post("posts/" + post.id + "/reaction", {
        reaction_type: 1,
      });
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleViewPostClick = () => {
    history.push(`/posts/${post.id}`);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const menuId = "post-list-item-menu";

  const renderMenu = (
    <Menu
      anchorEl={menuAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!singlePost ? (
        <MenuItem onClick={handleViewPostClick}>
          <p>View post</p>
        </MenuItem>
      ) : null}
    </Menu>
  );

  return (
    <Grid item>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar className={classes.avatar} src={avatarUrl}></Avatar>}
          action={
            !singlePost || user_id === post.author.id ? (
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            ) : null
          }
          title={post.author.first_name + " " + post.author.last_name}
          titleTypographyProps={{
            variant: "subtitle1",
            className: classes.title,
            onClick: handleTitleClick,
          }}
          subheader={createdAt.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
          subheaderTypographyProps={{ variant: "caption" }}
        />
        {post.media_type === "image" ? (
          <>
            <Skeleton
              variant="rect"
              height={300}
              animation="wave"
              width="100%"
              style={!isImageLoading ? { display: "none" } : {}}
            />
            <CardMedia
              component="img"
              onLoad={handleImageLoad}
              image={imageUrl}
              style={isImageLoading ? { display: "none" } : {}}
            />
          </>
        ) : null}
        {post.media_type === "video" ? (
          <CardMedia
            component="video"
            onLoad={handleImageLoad}
            src={imageUrl}
            style={isImageLoading ? { display: "none" } : {}}
          />
        ) : null}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.caption}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleFavouriteClick}>
            {isLiked ? (
              <FavoriteRounded style={{ color: "#ea3c3c" }} />
            ) : (
              <FavoriteBorderRounded />
            )}
          </IconButton>
          {likeCount > 0 ? (
            <Link style={{ cursor: "pointer" }} variant="subtitle2">
              Liked by {likeCount} people
            </Link>
          ) : null}
        </CardActions>
        <Divider />
        <List className={classes.list}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar src="" />
            </ListItemAvatar>
            <ListItemText
              primary="Super User"
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  This is a comment
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar src="" />
            </ListItemAvatar>
            <ListItemText
              primary="Super User"
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  This is a comment
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Card>
      {renderMenu}
    </Grid>
  );
};

export default PostItem;
