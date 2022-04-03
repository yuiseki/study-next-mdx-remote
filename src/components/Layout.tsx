import { ReactElement } from "react";
import { Breadcrumb } from "./Breadcrumb";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Breadcrumb />
    <div className="container-fluid px-5">{children}</div>
  </>
);
