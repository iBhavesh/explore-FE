import { Divider, Link, List, Modal, Grow } from "@material-ui/core";
import { Card, CardMedia, Grid, Typography, Backdrop } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ReactNode, useState } from "react";
import { useAppSelector } from "../../app/hooks";
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
  })
);

const ProfileHead = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [listContent, setlistContent] = useState<ReactNode>();
  const user = useAppSelector((state) => state.user.user);
  const followers = useAppSelector((state) => state.follower.followers);
  const following = useAppSelector((state) => state.follower.following);

  const handleFollowerModalOpen = () => {
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
        <CardMedia
          className={classes.profilePicture}
          component="img"
          //   style={{ flexGrow: 3 }}
          src={
            user!.profile_picture ??
            "https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png"
          }
        />
        <div className={classes.grow}></div>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-evenly",
            flexGrow: 6,
            flexDirection: "column",
          }}
        >
          <div>
            <Typography className={classes.title} variant="h4">
              {`${user!.first_name} ${user!.last_name}`}
            </Typography>
          </div>
          <div style={{ marginTop: "8px" }}>
            <Typography variant="subtitle1">{user!.email}</Typography>
          </div>
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
        </div>
      </Card>
    </Grid>
  );
};

export default ProfileHead;
