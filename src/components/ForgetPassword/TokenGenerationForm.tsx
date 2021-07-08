import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import axios from "axios";
import { useState } from "react";
import { Divider } from "@material-ui/core";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    marginTop: theme.spacing(25),
    display: "flex",
    flexDirection: "column",
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
});

type Props = {
  showPasswordForm: () => void;
};

const TokenGenerationForm = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
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
          <Typography
            style={{ fontWeight: 500, marginLeft: 8, marginTop: 8 }}
            variant="h5"
          >
            Reset Password
          </Typography>
          <Divider />
          <Typography style={{ marginLeft: 8, marginTop: 8 }} variant="body1">
            Password Reset Token will be Sent to your email
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.post(
                  process.env.REACT_APP_API + "user/forgot-password",
                  values
                );
                props.showPasswordForm();
              } catch (e) {
                let message = "Something went wrong!";
                if (typeof e.response.data == "object")
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
                    Submit
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </Container>
  );
};

export default TokenGenerationForm;
