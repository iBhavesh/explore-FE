import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import axiosInstance from "../axios";
import { showError, showSuccess } from "../features/uiSlice/uiSlice";

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    borderRadius: "0.5rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "24px",
    paddingTop: "15px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    margin: theme.spacing(3, "auto"),
    maxWidth: "40px",
  },
  gender: {
    minWidth: "100px",
  },
  heading: {
    marginTop: "10px",
  },
}));

const date = new Date();
date.setFullYear(date.getFullYear() - 13);

const initialValues = {
  password: "",
  new_password: "",
  confirm_password: "",
};

// type Values = typeof initialValues;

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be minimim 8 characters"),
  new_password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be minimim 8 characters"),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_password")], "Passwords do not match"),
});

const ChangePasswordPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Explore | Register";
  }, []);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.pageWrapper}>
          <Typography className={classes.heading} component="h1" variant="h4">
            Change Password
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axiosInstance.put(
                  "user/password",
                  values
                );
                console.log(response);
                dispatch(showSuccess("Password updated!"));
              } catch (e) {
                let message = "Something went wrong!";
                if (e.response.data) dispatch(showError(e.response.data));
                else dispatch(showError(message));
              }
              setSubmitting(false);
            }}
          >
            {({ submitForm, isSubmitting, touched, errors }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="Old Password"
                        type="password"
                        id="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        name="new_password"
                        label="New Password"
                        type="password"
                        id="new_password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_password"
                      />
                    </Grid>
                  </Grid>

                  {isSubmitting ? (
                    <div className={classes.progress}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Change Password
                    </Button>
                  )}
                </Form>
              </MuiPickersUtilsProvider>
            )}
          </Formik>
        </div>
      </Paper>
    </Container>
  );
};

export default ChangePasswordPage;
