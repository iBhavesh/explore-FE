import { Card, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 120,
        width: 600,
      },
    },
  })
);
const PrivateProfileCard = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <LockOutlinedIcon />
        <Typography variant="subtitle2">This Account is Private</Typography>
        <Typography variant="body1">
          Follow the user to see their posts
        </Typography>
      </Card>
    </Grid>
  );
};

export default PrivateProfileCard;
