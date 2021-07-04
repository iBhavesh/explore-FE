import { useHistory, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DatePicker } from "formik-material-ui-pickers";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlice";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
};

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
    fontFamily: "Eagle Lake",
    fontSize: "3.0rem",
    color: "#04009A",
  },
}));

const date = new Date();
date.setFullYear(date.getFullYear() - 13);

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  date_of_birth: date,
  password: "",
  confirm_password: "",
};

// type Values = typeof initialValues;

const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  date_of_birth: Yup.date()
    .required("Date of birth is required")
    .max(date, "You should be atleast 13 years old to signup"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be minimim 8 characters"),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const to = useQuery().get("to");
  const history = useHistory();
  let loginRoute = "/login";
  if (to) loginRoute = "/login?to=" + to;

  const classes = useStyles();

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Explore | Register</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleSnackBarClose}
          autoHideDuration={3000}
        >
          <Alert icon={false} severity="error" onClose={handleSnackBarClose}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Paper className={classes.paper} elevation={3}>
          <div className={classes.pageWrapper}>
            <Typography className={classes.heading} component="h1" variant="h5">
              Explore
            </Typography>
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
                  let response = await axios.post(
                    process.env.REACT_APP_API + "user/register",
                    { ...values, date_of_birth: dob }
                  );
                  response = await axios.post(
                    process.env.REACT_APP_API + "user/login",
                    values
                  );
                  dispatch(login(response.data));
                  if (to) history.replace(to);
                  else history.replace("/");
                } catch (e) {
                  let message = "Something went wrong!";
                  if (e.response.data)
                    for (const key in e.response.data) {
                      message = e.response.data[key] + "\n";
                    }

                  setErrorMessage(message);
                  setOpen(true);
                }
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
                          defaultValue="Male"
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
                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
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
                        Sign Up
                      </Button>
                    )}
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link
                          component={RouterLink}
                          to={loginRoute}
                          variant="body2"
                        >
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                </MuiPickersUtilsProvider>
              )}
            </Formik>
          </div>
        </Paper>
      </Container>
    </HelmetProvider>
  );
};

export default RegisterPage;
