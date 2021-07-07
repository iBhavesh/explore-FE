import CircularProgress from "@material-ui/core/CircularProgress";

export default function CircularIndeterminate() {
  return (
    <div
      style={{
        height: "83vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={50} />
    </div>
  );
}
