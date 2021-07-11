import { Button, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { acceptFollowRequest } from "../../features/follower/followerSlice";

const AcceptButton = (props: { id: number }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.follower.status);
  const [isClicked, setIsClicked] = useState(false);

  const handleAcceptClick = () => {
    setIsClicked(true);
    dispatch(acceptFollowRequest(props.id));
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
    <Button
      style={{
        marginRight: 8,
        color: "white",
        backgroundColor: "#1565c0",
      }}
      variant="outlined"
      onClick={handleAcceptClick}
    >
      Accept
    </Button>
  );
};

export default AcceptButton;
