import clsx from "clsx";
import { PropsWithChildren } from "react";
import Nav from "../Nav/Nav";
import { _base } from "./Layout.css";

interface Props {
  className?: string;
}

const Layout: React.FC<PropsWithChildren<Props>> = (
  { children, className },
) => {
  return (
    <div className={clsx(_base, className)}>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
