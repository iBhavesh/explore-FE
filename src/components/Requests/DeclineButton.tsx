import { Button, CircularProgress } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { declineFollowRequest } from "../../features/follower/followerSlice";

let isClicked = false;

const DeclineButton = (props: { id: number }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.follower.status);

  const handleDeclineClick = () => {
    isClicked = true;
    dispatch(declineFollowRequest(props.id));
  };

  if (isClicked && status === "loading")
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 30px",
        }}
      >
        <CircularProgress size={25} />
      </div>
    );

  return (
    <Button variant="outlined" onClick={handleDeclineClick}>
      Decline
    </Button>
  );
};

export default DeclineButton;
