import { useEffect } from "react";

const NotificationPage = () => {
  useEffect(() => {
    document.title = "Explore | Notifications";
  }, []);

  return (
    <div>
      <h2>Hello there! Welcome to notification page.</h2>
    </div>
  );
};

export default NotificationPage;
