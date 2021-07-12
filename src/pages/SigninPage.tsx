import { useHistory, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAppDispatch } from "../app/hooks";
import axios from "axios";
import { login } from "../features/auth/authSlice";
import { useEffect } from "react";
import { showError } from "../features/uiSlice/uiSlice";

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    marginTop: theme.spacing(16),
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
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be minimim 8 characters"),
});

const SigninPage = () => {
  const dispatch = useAppDispatch();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  useEffect(() => {
    document.title = "Explore | Sign In";
  }, []);

  const to = useQuery().get("to");
  let registerRoute = "/register";
  if (to) registerRoute = "/register?to=" + to;
  const history = useHistory();

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.pageWrapper}>
          <Typography className={classes.heading} component="h1" variant="h5">
            Explore
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axios.post(
                  process.env.REACT_APP_API + "user/signin",
                  values
                );
                await dispatch(login(response.data));

                if (to) history.replace(to);
                else history.replace("/");

                window.location.reload();
              } catch (e) {
                let message = "Something went wrong!";
                if (typeof e.response.data == "object")
                  for (const key in e.response.data) {
                    message = e.response.data[key] + "\n";
                  }
                dispatch(showError(message));
              }
              setSubmitting(false);
            }}
          >
            {({ submitForm, isSubmitting, touched, errors }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
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
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
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
                    Sign In
                  </Button>
                )}
                <Grid container justify="space-between">
                  <Grid item>
                    <Link
                      component={RouterLink}
                      to="/forget-password"
                      variant="body2"
                    >
                      Forgot Password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component={RouterLink}
                      to={registerRoute}
                      variant="body2"
                    >
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </Container>
  );
};

export default SigninPage;
