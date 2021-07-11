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
} from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { closeAddPostModal } from "../../features/uiSlice/uiSlice";

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
      width: 400,
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
            <Grid style={{ paddingTop: 8 }} container>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  placeholder="Caption..."
                />
              </Grid>
            </Grid>
          </Card>
        </Grow>
      </Modal>
    </div>
  );
};

export default Layout;
