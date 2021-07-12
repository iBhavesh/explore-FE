import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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
  CircularProgress,
} from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { closeAddPostModal } from "../../features/uiSlice/uiSlice";
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import axiosInstance from "../../axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { fetchUser } from "../../features/user/userSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
    },
    modalCard: {
      maxHeight: 800,
      width: 400,
      borderRadius: 8,
      outline: "none",
      padding: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        width: 500,
      },
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
      [theme.breakpoints.up("md")]: {
        height: 300,
      },
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

const AddPost = () => {
  const modalOpen = useAppSelector((state) => state.ui.isOpenAddPostModal);
  const postType = useAppSelector((state) => state.ui.postType);
  const user = useAppSelector((state) => state.auth.accessToken!.user_id);
  const dispatch = useAppDispatch();
  const [mediaSrc, setMediaSrc] = useState("");
  const [status, setStatus] = useState<"uploading" | "idle" | "succeeded">(
    "idle"
  );
  const [isVideo, setIsVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();

  const classes = useStyles();

  const handleModalClose = () => {
    dispatch(closeAddPostModal());
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const upload = async () => {
      setStatus("uploading");
      console.dir(event.target);
      const formData = new FormData();
      formData.append("content_type", postType);
      formData.append("media_type", isVideo ? "video" : "image");
      formData.append("author", String(user));
      formData.append("media", fileInputRef!.current!.files![0]);
      if (postType === "post")
        formData.append("caption", captionRef.current!.value);
      const url = postType === "post" ? "posts/" : "user/profile/picture";
      axiosInstance
        .post(url, formData, { timeout: 100000 })
        .then((response) => {
          setStatus("succeeded");
          setMediaSrc("");
          if (postType === "profile") dispatch(fetchUser(user));
          if (postType === "post") history.push("/posts/" + response.data.id);
          handleModalClose();
        })
        .catch((e) => {
          setStatus("succeeded");
          console.log(e);
        });
    };
    upload();
  };

  return (
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
                {postType === "post" ? "Add post" : "Upload Photo"}
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
            <Grid style={{ position: "relative" }} container justify="flex-end">
              <div
                style={{ display: mediaSrc === "" ? "flex" : "none" }}
                className={classes.imageDiv}
              >
                <AddAPhotoRoundedIcon />
                <input
                  ref={fileInputRef}
                  required
                  accept={postType === "post" ? "image/*,video/*" : "image/*"}
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
                    style={{ maxHeight: 400 }}
                    component={isVideo ? "video" : "img"}
                    src={mediaSrc}
                    controls
                  />
                </>
              ) : null}
              {postType === "post" ? (
                <Grid item xs={12}>
                  <TextField
                    inputRef={captionRef}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Caption..."
                  />
                </Grid>
              ) : null}
              <Grid style={{ marginTop: 4 }} item>
                {status === "uploading" ? (
                  <CircularProgress size={25} />
                ) : (
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
                )}
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grow>
    </Modal>
  );
};

export default AddPost;
