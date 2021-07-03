import { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
