import {
  Divider,
  Link,
  List,
  Modal,
  Grow,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Card, CardMedia, Grid, Typography, Backdrop } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axiosInstance from "../../axios";
import {
  cancelFollowRequest,
  sendFollowRequest,
} from "../../features/follower/followerSlice";
import FollowListItem from "../FollowListItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        width: 600,
      },
    },
    profilePicture: {
      width: 150,
      height: 150,
      borderRadius: "50%",
      [theme.breakpoints.up("sm")]: {
        width: 200,
        height: 200,
      },
    },
    title: {
      // marginTop: theme.spacing(1),
    },
    grow: {
      flexGrow: 5,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
    },
    modalCard: {
      height: 400,
      width: 400,
      borderRadius: 8,
      outline: "none",
      padding: theme.spacing(1),
    },
    list: { overflow: "auto", height: 400 },
    followButton: {
      color: "white",
      backgroundColor: "#1565c0",
      "&:hover": {
        backgroundColor: "#3078ca",
      },
    },
  })
);
const placeholderImage =
  "https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png";
const ProfileHead = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [listContent, setlistContent] = useState<ReactNode>();
  const user = useAppSelector((state) => state.user.user);
  const currentUser = useAppSelector(
    (state) => state.auth.accessToken!.user_id
  );
  const followers = useAppSelector((state) => state.follower.followers);
  const following = useAppSelector((state) => state.follower.following);
  const followed_by_user = useAppSelector(
    (state) => state.follower.followed_by_user
  );
  const [isInitial, setIsInitial] = useState(true);
  const [profileUrl, setProfileUrl] = useState<null | string>(null);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const follower_status = useAppSelector((state) => state.follower.status);

  useEffect(() => {
    if (isInitial) {
      if (user) {
        if (user!.profile_picture) {
          axiosInstance.get(user!.profile_picture).then((response) => {
            setProfileUrl(response.data.url);
          });
        } else {
          setProfileUrl(placeholderImage);
        }
      }
    }
    setIsInitial(false);
  }, [user, setIsInitial, isInitial]);

  const handleFollowButtonClick = () => {
    if (followed_by_user === null) {
      dispatch(sendFollowRequest(user!.id));
    } else if (followed_by_user) {
      followButtonText = "Unfollow";
    } else {
      dispatch(cancelFollowRequest(user!.id));
    }
  };

  const handleFollowerModalOpen = () => {
    if (followers.length === 0) return;
    setOpen(true);
    const content = followers.map((item, i, arr) => {
      if (i === arr.length - 1)
        return <FollowListItem user={item} isFollower />;
      return (
        <>
          <FollowListItem user={item} isFollower />
          <Divider />
        </>
      );
    });
    setlistContent(content);
  };
  const handleFollowingModalOpen = () => {
    if (following.length === 0) return;
    setOpen(true);
    const content = following.map((item, i, arr) => {
      if (i === arr.length - 1) return <FollowListItem user={item} />;
      return (
        <>
          <FollowListItem user={item} />
          <Divider />
        </>
      );
    });
    setlistContent(content);
  };

  const handleFollowerModalClose = () => {
    setOpen(false);
  };

  if (!user) return <></>;

  let followButtonText;
  let buttonVariant: "text" | "outlined" | "contained" = "contained";
  let buttonClasses = classes.followButton;

  if (followed_by_user === null) {
    followButtonText = "Follow";
  } else if (followed_by_user) {
    followButtonText = "Unfollow";
  } else {
    followButtonText = "Cancel Request";
    buttonClasses = "";
    buttonVariant = "outlined";
  }

  return (
    <Grid container justify="center">
      <Modal
        open={open}
        onClose={handleFollowerModalClose}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Grow in={open}>
          <Card className={classes.modalCard}>
            <List className={classes.list}>{listContent}</List>
          </Card>
        </Grow>
      </Modal>
      <Card className={classes.root}>
        <Skeleton
          className={classes.profilePicture}
          variant="circle"
          animation="wave"
          style={!imageIsLoading ? { display: "none" } : {}}
        />
        <CardMedia
          className={classes.profilePicture}
          style={imageIsLoading ? { display: "none" } : {}}
          onLoad={() => {
            setImageIsLoading(false);
          }}
          component="img"
          //   style={{ flexGrow: 3 }}
          src={profileUrl ?? ""}
        />
        <div className={classes.grow} />
        <div
          style={{
            display: "flex",
            // justifyContent: "space-evenly",
            flexGrow: 6,
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>
            <Typography className={classes.title} variant="h5">
              {`${user!.first_name} ${user!.last_name}`}
            </Typography>
            <div className={classes.grow} />
            {currentUser !== user.id ? (
              follower_status === "loading" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={20} />
                </div>
              ) : (
                <Button
                  onClick={handleFollowButtonClick}
                  variant={buttonVariant}
                  className={buttonClasses}
                >
                  {followButtonText}
                </Button>
              )
            ) : null}
            <div className={classes.grow} />
          </div>
          <div style={{ marginTop: "8px" }}>
            <Typography variant="subtitle1">{user!.email}</Typography>
          </div>
          <div className={classes.grow} />
          <div style={{ display: "flex", marginTop: "8px" }}>
            <div style={{ flexGrow: 1 }}>
              <Link
                style={{ color: "black", cursor: "pointer" }}
                variant="subtitle1"
                onClick={handleFollowerModalOpen}
              >
                <Typography style={{ display: "inline", fontWeight: 700 }}>
                  {followers.length}
                </Typography>
                {" Followers"}
              </Link>
            </div>
            <div style={{ flexGrow: 5 }}>
              <Link
                style={{ color: "black", cursor: "pointer" }}
                variant="subtitle1"
                onClick={handleFollowingModalOpen}
              >
                <Typography style={{ display: "inline", fontWeight: 700 }}>
                  {following.length}
                </Typography>
                {" Following"}
              </Link>
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.grow} />
        </div>
        <div className={classes.grow} />
        <div className={classes.grow} />
      </Card>
    </Grid>
  );
};

export default ProfileHead;
