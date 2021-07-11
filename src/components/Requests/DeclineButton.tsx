import { Button, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { declineFollowRequest } from "../../features/follower/followerSlice";

const DeclineButton = (props: { id: number }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.follower.status);
  const [isClicked, setIsClicked] = useState(false);

  const handleDeclineClick = () => {
    setIsClicked(true);
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
