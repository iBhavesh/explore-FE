import { useLocation } from "react-router-dom";
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
  heading: {
    marginTop: "10px",
    fontFamily: "Yellowtail",
    fontSize: "3.0rem",
    color: "#3e76bd",
  },
}));

const date = new Date();
date.setFullYear(date.getFullYear() - 13);

const initialValues = {
  email: "",
  password: "",
};

// type Values = typeof initialValues;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be minimim 8 characters"),
});

const RegisterPage = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const to = useQuery().get("to");
  let registerRoute = "/register";
  if (to) registerRoute = "/register?to=" + to;
  // const history = useHistory();

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
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                // alert(JSON.stringify(values, null, 2));
              }, 500);
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <Grid container justify="flex-end">
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

export default RegisterPage;
