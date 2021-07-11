import { Card, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 500,
      },
    },
  })
);
const NoNotificationFound = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <Typography variant="subtitle1">
          You don't have any notifications
        </Typography>
      </Card>
    </Grid>
  );
};

export default NoNotificationFound;
