import { Helmet, HelmetProvider } from "react-helmet-async";

const NotificationPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Explore | Notifications</title>
      </Helmet>
      <div>
        <h2>Hello there! Welcome to notification page.</h2>
      </div>
    </HelmetProvider>
  );
};

export default NotificationPage;
