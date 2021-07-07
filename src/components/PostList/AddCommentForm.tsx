import { useRef } from "react";
import { InputBase, Paper } from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useAppDispatch } from "../../app/hooks";
import { addPostComment } from "../../features/comments/commentsSlice";

const AddCommentForm = (props: { post_id: number; user_id: number }) => {
  const inputBaseRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  return (
    <Paper
      onSubmit={(event) => {
        event.preventDefault();
        const data = {
          author: props.user_id,
          post: props.post_id,
          comment: inputBaseRef.current!.value,
        };
        const url = `posts/${props.post_id}/comments`;
        dispatch(addPostComment({ url, data }));
        inputBaseRef.current!.value = "";
      }}
      style={{
        paddingLeft: "16px",
        paddingRight: "16px",
        display: "flex",
      }}
      component="form"
    >
      <InputBase
        inputRef={inputBaseRef}
        style={{ width: "100%" }}
        placeholder="Comment..."
      />
      <div>
        <IconButton type="submit" color="primary">
          <SendRounded />
        </IconButton>
      </div>
    </Paper>
  );
};

export default AddCommentForm;
