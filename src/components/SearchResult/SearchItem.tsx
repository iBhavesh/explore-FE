import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { blue } from "@material-ui/core/colors";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { User } from "../../features/user/userSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      "&:hover": {
        backgroundColor: "#f0f0f0 ",
        cursor: "pointer",
      },
      [theme.breakpoints.up("sm")]: {
        width: 500,
      },
    },
    avatar: {
      backgroundColor: blue[800],
    },
  })
);

type Props = {
  user: User;
};

const SearchResultItem = (props: Props) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (props.user.profile_picture !== null) {
      axiosInstance.get(props.user.profile_picture).then((response) => {
        setImageUrl(response.data.url);
      });
    }
  }, [props.user.profile_picture]);

  return (
    <Grid item>
      <Card
        className={classes.root}
        onClick={() => {
          history.push(`/user/${props.user.id}`);
        }}
      >
        <Avatar className={classes.avatar} src={imageUrl ?? ""} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 8,
          }}
        >
          <div>
            <Typography component="span" variant="subtitle2">
              {props.user.first_name + " " + props.user.last_name}
            </Typography>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default SearchResultItem;
