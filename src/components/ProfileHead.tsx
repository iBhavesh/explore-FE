import { Divider, Link, List, Modal, Grow } from "@material-ui/core";
import { Card, CardMedia, Grid, Typography, Backdrop } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useState } from "react";
import FollowListItem from "./FollowListItem";

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
    },
  })
);

const ProfileHead = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleFollowerModalOpen = () => {
    setOpen(true);
  };
  const handleFollowingModalOpen = () => {
    setOpen(true);
  };

  const handleFollowerModalClose = () => {
    setOpen(false);
  };

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
            <div style={{ overflow: "auto" }}>
              <List>
                <FollowListItem />
                <Divider />
                <FollowListItem />
                <Divider />
                <FollowListItem />
                <Divider />
                <FollowListItem />
                <Divider />
                <FollowListItem />
                <Divider />
                <FollowListItem />
                <Divider />
                <FollowListItem />
                <Divider />
                <FollowListItem />
                <Divider />
              </List>
            </div>
          </Card>
        </Grow>
      </Modal>
      <Card className={classes.root}>
        <CardMedia
          className={classes.profilePicture}
          component="img"
          //   style={{ flexGrow: 3 }}
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg  "
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
              Bhavesh Sharma
            </Typography>
          </div>
          <div style={{ marginTop: "8px" }}>
            <Typography variant="subtitle1">bs466218@gmail.com</Typography>
          </div>
          <div style={{ display: "flex", marginTop: "8px" }}>
            <div style={{ flexGrow: 1 }}>
              <Link
                style={{ color: "black", cursor: "pointer" }}
                variant="subtitle1"
                onClick={handleFollowerModalOpen}
              >
                <Typography style={{ display: "inline", fontWeight: 700 }}>
                  3
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
                  3
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
