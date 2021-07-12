import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "formik-material-ui-pickers";
import {
  Button,
  MenuItem,
  Card,
  CardMedia,
  Divider,
  Grid,
  Typography,
  Backdrop,
  Modal,
  Grow,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axiosInstance from "../axios";
import CircularIndeterminate from "../components/UI/CircularIndeterminate";
import { fetchUser } from "../features/user/userSlice";
import { openUploadProfileModal } from "../features/uiSlice/uiSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 350,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(2),
      // marginBottom: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "column",
        width: 400,
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
    gender: {
      minWidth: "100px",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    progress: {
      margin: theme.spacing(3, "auto"),
      maxWidth: "40px",
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
      width: 400,
      // height: 226,
      borderRadius: 16,
      outline: "none",
      padding: theme.spacing(1),
      paddingBottom: 0,
    },
    list: { overflow: "auto", height: 400 },
    followButton: {
      color: "white",
      backgroundColor: "#1565c0",
      "&:hover": {
        backgroundColor: "#3078ca",
      },
    },
    form: {
      marginTop: theme.spacing(2),
    },
  })
);

const placeholderImage =
  "https://www.hmiscfl.org/wp-content/uploads/2018/06/placeholder.png";

const date = new Date();
date.setFullYear(date.getFullYear() - 13);

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  date_of_birth: Yup.date()
    .required("Date of birth is required")
    .max(date, "You should be atleast 13 years old to signup"),
});

const AccountPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const user_id = useAppSelector((state) => state.auth.accessToken!.user_id);
  const [profileUrl, setProfileUrl] = useState<null | string>(null);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const userStatus = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [removing, setRemoving] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUser(user_id));
  }, [dispatch, user_id]);

  useEffect(() => {
    if (user) {
      if (user!.profile_picture) {
        axiosInstance.get(user!.profile_picture).then((response) => {
          setProfileUrl(response.data.url);
        });
      } else {
        setProfileUrl(placeholderImage);
      }
    }
  }, [user]);

  useEffect(() => {
    document.title = "Explore | Account";
  }, []);

  const handleUploadModalClose = () => {
    setShowUploadModal(false);
  };

  const handleUploadModalOpen = () => {
    setShowUploadModal(true);
  };

  let initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: date,
  };

  if (user) {
    initialValues = {
      first_name: user!.first_name,
      last_name: user!.last_name,
      email: user!.email,
      date_of_birth: new Date(user!.date_of_birth),
    };
  }

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const dob =
              values.date_of_birth.getFullYear() +
              "-" +
              (+values.date_of_birth.getMonth() + 1) +
              "-" +
              values.date_of_birth.getDate();
            try {
              await axiosInstance.patch("user/profile/" + user!.id, {
                ...values,
                date_of_birth: dob,
              });
            } catch (e) {}
            setSubmitting(false);
          }}
        >
          {({ submitForm, isSubmitting, touched, errors }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="first_name"
                      variant="outlined"
                      fullWidth
                      id="first_name"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      disabled
                      id="email"
                      label="Email Address"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={DatePicker}
                      inputVariant="outlined"
                      format="yyyy/MM/dd"
                      fullWidth
                      id="date_of_birth"
                      label="Date of birth"
                      name="date_of_birth"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      className={classes.gender}
                      component={TextField}
                      type="text"
                      name="gender"
                      label="Gender"
                      select
                      variant="outlined"
                      defaultValue={user?.gender ?? "Male"}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem key="Male" value="Male">
                        Male
                      </MenuItem>
                      <MenuItem key="Female" value="Female">
                        Female
                      </MenuItem>
                      <MenuItem key="Other" value="Other">
                        Other
                      </MenuItem>
                    </Field>
                  </Grid>
                </Grid>
                <Grid
                  style={{ marginTop: 16 }}
                  container
                  justify="space-between"
                >
                  <Grid item>
                    <Button
                      onClick={() => {
                        history.push("/account/change-password");
                      }}
                      variant="contained"
                    >
                      Change Password
                    </Button>
                  </Grid>
                  <Grid item>
                    {isSubmitting ? (
                      <div className={classes.progress}>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Button type="submit" variant="contained" color="primary">
                        Update
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Form>
            </MuiPickersUtilsProvider>
          )}
        </Formik>
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
          <Card
            className={classes.modalCard}
            style={{ height: removing ? 226 : "auto" }}
          >
            {removing ? (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={25} />
              </div>
            ) : (
              <>
                <Typography
                  style={{
                    textAlign: "center",
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                  variant="h5"
                >
                  Change Profile Photo
                </Typography>
                <List style={{ padding: 0 }}>
                  <Divider />
                  <ListItem
                    style={{
                      justifyContent: "center",
                      paddingTop: 10,
                      paddingBottom: 10,
                      color: "#1565c0",
                    }}
                    onClick={() => {
                      handleUploadModalClose();
                      dispatch(openUploadProfileModal());
                    }}
                    button
                  >
                    <Typography variant="subtitle2">Upload Photo</Typography>
                  </ListItem>
                  <Divider />
                  {user?.profile_picture ? (
                    <>
                      <ListItem
                        style={{
                          justifyContent: "center",
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                        onClick={() => {
                          const handle = async () => {
                            setRemoving(true);
                            axiosInstance
                              .delete("user/profile/picture/remove")
                              .then(() => {
                                dispatch(fetchUser(user.id));
                                setRemoving(false);
                                handleUploadModalClose();
                              })
                              .catch((e) => {
                                setRemoving(false);
                                handleUploadModalClose();
                              });
                          };
                          handle();
                        }}
                        button
                      >
                        <Typography color="secondary" variant="subtitle2">
                          Remove Current Photo
                        </Typography>
                      </ListItem>
                      <Divider />
                    </>
                  ) : null}
                  <ListItem
                    onClick={() => {
                      setShowUploadModal(false);
                    }}
                    style={{
                      justifyContent: "center",
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                    button
                  >
                    <Typography variant="subtitle2">Cancel</Typography>
                  </ListItem>
                </List>
              </>
            )}
          </Card>
        </Grow>
      </Modal>
    </Grid>
  );
};

export default AccountPage;
