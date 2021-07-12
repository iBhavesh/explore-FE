import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Typography,
  Backdrop,
  Modal,
  Grow,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axiosInstance from "../axios";
import CircularIndeterminate from "../components/UI/CircularIndeterminate";
import { fetchUser } from "../features/user/userSlice";

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
      width: 75,
      height: 75,
      borderRadius: "50%",
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

const AccountPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const user_id = useAppSelector((state) => state.auth.accessToken!.user_id);
  const [isInitial, setIsInitial] = useState(true);
  const [profileUrl, setProfileUrl] = useState<null | string>(null);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const userStatus = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(user_id));
  }, [dispatch, user_id]);

  useEffect(() => {
    if (user) {
      if (isInitial) {
        if (user!.profile_picture) {
          axiosInstance.get(user!.profile_picture).then((response) => {
            setProfileUrl(response.data.url);
          });
        } else {
          setProfileUrl(placeholderImage);
        }
        setIsInitial(false);
      }
    }
  }, [user, setIsInitial, isInitial]);

  useEffect(() => {
    document.title = "Explore | Account";
  }, []);

  const handleUploadModalClose = () => {
    setShowUploadModal(false);
  };

  const handleUploadModalOpen = () => {
    setShowUploadModal(true);
  };

  if (userStatus === "loading") return <CircularIndeterminate />;
  if (error) return <Typography variant="h5">User Not Found</Typography>;

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <div style={{ display: "flex" }}>
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
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: 4,
              paddingLeft: 30,
            }}
          >
            <Typography variant="h6">{user?.email}</Typography>
            <Button
              onClick={handleUploadModalOpen}
              style={{ color: "#1565c0", padding: 0 }}
              variant="text"
            >
              Change profile picture
            </Button>
          </div>
        </div>
      </Card>
      <Modal
        open={showUploadModal}
        onClose={handleUploadModalClose}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Grow in={showUploadModal}>
          <Card className={classes.modalCard}>
            <Typography style={{ textAlign: "center" }} variant="h6">
              Change Profile Photo
            </Typography>
            <Divider />
          </Card>
        </Grow>
      </Modal>
    </Grid>
  );
};

export default AccountPage;
