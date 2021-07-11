import { List } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useAppSelector } from "../../../app/hooks";
import CommentItem from "./CommentItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      maxHeight: "300px",
      display: "flex",
      flexDirection: "column-reverse",
      overflowX: "auto",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
  })
);

const CommentList = () => {
  const classes = useStyles();
  const comments = useAppSelector((state) => state.comments.comments);
  const error = useAppSelector((state) => state.comments.error);

  if (error) return <div>{error}</div>;

  return (
    <List className={classes.list}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </List>
  );
};

export default CommentList;
