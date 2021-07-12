import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { hideError } from "../../features/uiSlice/uiSlice";

const Alert = (props: AlertProps) => {
  console.log("Alert");
  return <MuiAlert elevation={3} variant="filled" {...props} />;
};

const SnackBarError = () => {
  const error = useAppSelector((state) => state.ui.error);
  const open = useAppSelector((state) => state.ui.showError);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        dispatch(hideError());
      }}
      autoHideDuration={3000}
    >
      <Alert
        icon={false}
        severity="error"
        onClose={() => {
          dispatch(hideError());
        }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarError;
