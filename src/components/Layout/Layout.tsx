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
} from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { closeAddPostModal } from "../../features/uiSlice/uiSlice";
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";

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
      maxHeight: 400,
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

  const classes = useStyles();

  const handleModalClose = () => {
    dispatch(closeAddPostModal());
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
            <div className={classes.modalTitle}>
              <div className={classes.grow1} />
              <Typography style={{ textAlign: "center" }} variant="h6">
                Add Post
              </Typography>
              <div className={classes.grow1} />
              <IconButton
                onClick={handleModalClose}
                style={{
                  color: "#ee2929",
                  padding: 0,
                }}
              >
                <ClearRoundedIcon />
              </IconButton>
            </div>
            <Divider />
            <Grid style={{ paddingTop: 8 }} container justify="flex-end">
              <div className={classes.imageDiv}>
                <AddAPhotoRoundedIcon />
                <input
                  accept="image/*,video/*"
                  className={classes.fileInput}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
              </div>
              <Grid item xs={12}>
                <input
                  accept="image/*,video/*"
                  // className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Caption..."
                />
              </Grid>
              <Grid style={{ marginTop: 4 }} item>
                <Button
                  variant="contained"
                  color="default"
                  // className={classes.button}
                  startIcon={<CloudUploadRoundedIcon />}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grow>
      </Modal>
    </div>
  );
};

export default Layout;
