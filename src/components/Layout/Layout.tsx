import { ReactNode } from "react";
import { useAppSelector } from "../../app/hooks";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      {isAuthenticated ? <Header /> : <></>}
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
