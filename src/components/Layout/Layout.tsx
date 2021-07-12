import { ReactNode } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "./Header";
import {
  Card,
  Grow,
  Modal,
  Typography,
  Backdrop,
  IconButton,
  Divider,
  TextField,
  Grid,
  Button,
  CardMedia,
} from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { closeAddPostModal } from "../../features/uiSlice/uiSlice";
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import { useState } from "react";
import axiosInstance from "../../axios";

type Props = {
  children: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
      },
    },
    // content: {
    //   flexGrow: 1,
    //   backgroundColor: theme.palette.background.default,
    //   padding: theme.spacing(3),
    // },
    // necessary for content to be below app bar
    toolbar: {
      minHeight: 64,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
    },
    modalCard: {
      maxHeight: 800,
      maxWidth: 400,
      borderRadius: 8,
      outline: "none",
      padding: theme.spacing(1),
    },
    modalTitle: {
      display: "flex",
      flexDirection: "row",
    },
    grow1: {
      flexGrow: 1,
    },
    modalForm: {
      display: "flex",
      width: "100%",
    },
    imageDiv: {
      border: "1px solid black",
      height: 200,
      width: "100%",
      marginBottom: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      position: "relative",
    },
    fileInput: {
      width: "100%",
      height: "100%",
      position: "absolute",
      cursor: "pointer",
      opacity: 0,
    },
  })
);

const Layout = (props: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const modalOpen = useAppSelector((state) => state.ui.isOpenAddPostModal);
  const dispatch = useAppDispatch();
  const [mediaSrc, setMediaSrc] = useState("");
  const [isVideo, setIsVideo] = useState(false);

  const classes = useStyles();

  const handleModalClose = () => {
    dispatch(closeAddPostModal());
  };

  const handleFormSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    console.dir(event.target);
    const formData = new FormData();
    // formData.append('')
    axiosInstance.post("test/path", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  if (!isAuthenticated) return <>{props.children}</>;

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div id="layout-div" className={classes.toolbar} />
        {props.children}
      </main>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        disableBackdropClick
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Grow in={modalOpen}>
          <Card className={classes.modalCard}>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <div className={classes.modalTitle}>
                <div className={classes.grow1} />
                <Typography style={{ textAlign: "center" }} variant="h6">
                  Add Post
                </Typography>
                <div className={classes.grow1} />
                <IconButton
                  onClick={handleModalClose}
                  style={{
                    // color: "#ee2929",
                    padding: 0,
                  }}
                >
                  <ClearRoundedIcon />
                </IconButton>
              </div>
              <Divider />
              <Grid
                style={{ position: "relative" }}
                container
                justify="flex-end"
              >
                <div
                  style={{ display: mediaSrc === "" ? "flex" : "none" }}
                  className={classes.imageDiv}
                >
                  <AddAPhotoRoundedIcon />
                  <input
                    required
                    accept="image/*,video/*"
                    className={classes.fileInput}
                    id="contained-button-file"
                    multiple
                    name="fileToUpload"
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files![0];
                      if (file) {
                        const type = file.type;
                        setIsVideo(type.startsWith("video"));
                        const src = URL.createObjectURL(event.target.files![0]);
                        setMediaSrc(src);
                      }
                    }}
                  />
                </div>
                {mediaSrc ? (
                  <>
                    <IconButton
                      onClick={(event) => {
                        setMediaSrc("");
                      }}
                      style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 1,
                      }}
                      size="small"
                    >
                      <ClearRoundedIcon
                        fontSize="small"
                        style={{ color: "#fff" }}
                      />
                    </IconButton>
                    <CardMedia
                      style={{ maxHeight: 200 }}
                      component={isVideo ? "video" : "img"}
                      src={mediaSrc}
                      controls
                    />
                  </>
                ) : null}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Caption..."
                  />
                </Grid>
                <Grid style={{ marginTop: 4 }} item>
                  <Button
                    variant="contained"
                    disabled={mediaSrc === ""}
                    color="default"
                    // className={classes.button}
                    startIcon={<CloudUploadRoundedIcon />}
                    type="submit"
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grow>
      </Modal>
    </div>
  );
};

export default Layout;
