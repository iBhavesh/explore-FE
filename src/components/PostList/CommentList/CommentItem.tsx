import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Link,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Delete,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import axiosInstance from "../../../axios";
import {
  Comment,
  deletePostComment,
} from "../../../features/comments/commentsSlice";

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
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

type Props = { comment: Comment };

const CommentItem = (props: Props) => {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const user_id = useAppSelector((state) => state.auth.accessToken!.user_id);
  const createdAt = new Date(props.comment.created_at);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isInitial) {
      for (
        let index = 0;
        index < props.comment.comment_reaction.length;
        index++
      ) {
        const element = props.comment.comment_reaction[index];
        if (element.author === user_id) setIsLiked(true);
      }
      setIsInitial(false);
      setLikeCount(props.comment.comment_reaction.length);
    }
  }, [props.comment.comment_reaction, user_id, isInitial, setIsInitial]);

  const handleFavouriteClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      axiosInstance
        .delete(
          `posts/${props.comment.post.id}/comments/${props.comment.id}/reaction`
        )
        .catch((response) => {
          setIsLiked(true);
        });
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      axiosInstance
        .post(
          `posts/${props.comment.post.id}/comments/${props.comment.id}/reaction`,
          {
            reaction_type: 1,
          }
        )
        .catch((response) => {
          setIsLiked(false);
        });
    }
  };

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleAgree = () => {
    const url = `posts/${props.comment.post.id}/comments/${props.comment.id}`;
    dispatch(deletePostComment({ url, post_id: props.comment.post.id }));
    setOpen(false);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem alignItems="center">
        <Card style={{ width: "100%" }} elevation={0}>
          <CardHeader
            style={{ paddingBottom: 0, paddingRight: "8px" }}
            avatar={<Avatar className={classes.avatar} src=""></Avatar>}
            action={
              props.comment.author.id === user_id ||
              props.comment.post.author === user_id ? (
                <IconButton
                  style={{
                    color: "#ee2929",
                    padding: "8px",
                  }}
                  onClick={handleDeleteClick}
                >
                  <Delete />
                </IconButton>
              ) : null
            }
            title={
              props.comment.author.first_name +
              " " +
              props.comment.author.last_name
            }
            titleTypographyProps={{
              variant: "subtitle1",
              className: classes.title,
            }}
            subheader={props.comment.comment}
            subheaderTypographyProps={{ variant: "body1" }}
          />
          <CardActions
            style={{ paddingLeft: "8px", justifyContent: "space-between" }}
          >
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ paddingTop: "8px", paddingBottom: "8px" }}
              component="p"
            >
              {createdAt.toLocaleString([], {
                month: "long",
                year: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Typography>
            <div>
              <Link
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  paddingRight: 0,
                }}
                variant="subtitle2"
              >
                {likeCount}
              </Link>
              <IconButton
                style={{
                  padding: "8px",
                  paddingLeft: 0,
                  marginLeft: "8px",
                }}
                onClick={handleFavouriteClick}
              >
                {isLiked ? (
                  <FavoriteRounded style={{ color: "#ea3c3c" }} />
                ) : (
                  <FavoriteBorderRounded />
                )}
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </ListItem>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open}>
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the comment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommentItem;
