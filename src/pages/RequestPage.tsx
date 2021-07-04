import { Helmet, HelmetProvider } from "react-helmet-async";

const RequestPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Explore | Requests</title>
      </Helmet>
      <div>
        <h2>Hello there! Welcome to request page.</h2>
      </div>
    </HelmetProvider>
  );
};

export default RequestPage;
