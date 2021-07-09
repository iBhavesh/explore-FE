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
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import { useState } from "react";
import {
  FavoriteBorderRounded,
  FavoriteRounded,
  ChatBubbleOutlineRounded,
} from "@material-ui/icons";
import { useEffect } from "react";
import axiosInstance from "../../axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Menu } from "@material-ui/core";
import { Route, useHistory } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import AddCommentForm from "./AddCommentForm";
import {
  deletePost,
  fetchUserPosts,
  Post,
} from "../../features/posts/postsSlice";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import CommentList from "./CommentList/CommentList";
import { fetchPostComments } from "../../features/comments/commentsSlice";

type Props = {
  post: Post;
  singlePost: boolean;
};

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
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
    inline: {
      display: "inline",
    },
  })
);

const PostItem = ({ post, singlePost }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
  // console.log("PI", post.id);
  useEffect(() => {
    // console.log("useEffect", post.id, isInitial);
    if (isInitial) {
      for (let index = 0; index < post.post_reaction.length; index++) {
        const element = post.post_reaction[index];
        if (element.author === user_id) setIsLiked(true);
      }
      if (post.media_type === "image" || post.media_type === "video")
        axiosInstance
          .get(post.media)
          .then((response) => {
            setImageUrl(response.data.url);
            setErrorMessage("Something Went Wrong");
          })
          .catch((e) => {
            setIsImageLoading(false);
            setErrorMessage("Something Went Wrong");
          });
      if (post.author.profile_picture)
        axiosInstance.get(post.media).then((response) => {
          setAvatarUrl(response.data.url);
        });
      setIsInitial(false);
      setLikeCount(post.post_reaction.length);
    }
  }, [
    post.post_reaction,
    isInitial,
    setIsLiked,
    user_id,
    setLikeCount,
    post.id,
    post.media,
    post.author.profile_picture,
    post.media_type,
  ]);

  useEffect(() => {
    if (singlePost) {
      dispatch(fetchPostComments(post.id));
    }
  }, [dispatch, singlePost, post.id]);

  const handleTitleClick = () => {
    history.push(`/user/${post.author.id}`);
  };

  const handleFavouriteClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      axiosInstance
        .delete("posts/" + post.id + "/reaction")
        .catch((response) => {
          setIsLiked(true);
        });
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      axiosInstance
        .post("posts/" + post.id + "/reaction", {
          reaction_type: 1,
        })
        .catch((response) => {
          setIsLiked(false);
        });
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDeletePostClick = () => {
    handleMenuClose();
    setDialogOpen(true);
  };
  const handleCommentButtonClick = () => {
    if (!singlePost) history.push(`/posts/${post.id}`);
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
      <MenuItem onClick={handleDeletePostClick}>
        <p>Delete Post</p>
      </MenuItem>
    </Menu>
  );

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(deletePost({ post_id: post.id, user_id: user_id! }));
    console.log("delete");
    setDialogOpen(false);
    if (singlePost) history.goBack();
    else dispatch(fetchUserPosts(user_id!));
  };

  const handleDisagree = () => {
    setDialogOpen(false);
  };

  return (
    <Grid item>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleSnackBarClose}
        autoHideDuration={3000}
      >
        <Alert icon={false} severity="error" onClose={handleSnackBarClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar className={classes.avatar} src={avatarUrl}></Avatar>}
          action={
            user_id === post.author.id ? (
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
          <IconButton onClick={handleCommentButtonClick}>
            <ChatBubbleOutlineRounded />
          </IconButton>
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
        <Route path="/posts/:postId">
          <Divider />
          <CommentList />
          <AddCommentForm user_id={user_id!} post_id={post.id} />
        </Route>
      </Card>
      {renderMenu}
      <Dialog disableBackdropClick disableEscapeKeyDown open={dialogOpen}>
        <DialogTitle id="responsive-dialog-title">{"Delete post"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDisagree} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PostItem;
