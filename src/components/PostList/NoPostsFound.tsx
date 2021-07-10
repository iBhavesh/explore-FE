import { Card, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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
        height: 80,
        width: 600,
      },
    },
  })
);
const NoPostsFound = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <Typography variant="subtitle1">No posts found</Typography>
      </Card>
    </Grid>
  );
};

export default NoPostsFound;
