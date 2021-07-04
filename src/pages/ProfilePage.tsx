import { Helmet, HelmetProvider } from "react-helmet-async";

const ProfilePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Explore | Profile</title>
      </Helmet>
      <div>
        <h2>Hello there! Welcome to profile page.</h2>
      </div>
    </HelmetProvider>
  );
};

export default ProfilePage;
