import { Avatar, Button, Card, Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        width: 500,
      },
    },
    avatar: {
      backgroundColor: blue[800],
    },
  })
);

const RequestItem = () => {
  const classes = useStyles();
  return (
    <Grid item>
      <Card className={classes.root}>
        <Avatar className={classes.avatar} src="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 8,
          }}
        >
          <Typography variant="body1">Bhavesh Sharma</Typography>
          <Typography variant="subtitle2">a@a.com</Typography>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          <Button
            style={{
              marginRight: 8,
              color: "white",
              backgroundColor: "#1565c0",
            }}
            variant="outlined"
          >
            Accept
          </Button>
          <Button variant="outlined">Reject</Button>
        </div>
      </Card>
    </Grid>
  );
};

export default RequestItem;
