import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { hideSuccess } from "../../features/uiSlice/uiSlice";

const Alert = (props: AlertProps) => {
  console.log("Alert");
  return <MuiAlert elevation={3} variant="filled" {...props} />;
};

const SnackBar = () => {
  const success = useAppSelector((state) => state.ui.success);
  const open = useAppSelector((state) => state.ui.showSuccess);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        dispatch(hideSuccess());
      }}
      autoHideDuration={3000}
    >
      <Alert
        icon={false}
        severity="success"
        onClose={() => {
          dispatch(hideSuccess());
        }}
      >
        {success}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
