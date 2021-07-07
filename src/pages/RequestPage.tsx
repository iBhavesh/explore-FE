import { useEffect } from "react";

const RequestPage = () => {
  useEffect(() => {
    document.title = "Explore | Requests";
  }, []);

  return (
    <div>
      <h2>Hello there! Welcome to request page.</h2>
    </div>
  );
};

export default RequestPage;
