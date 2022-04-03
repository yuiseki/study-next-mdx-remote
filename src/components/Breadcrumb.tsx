import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Breadcrumb: React.VFC = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] =
    useState<{ href: string; label: string }[]>();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    setBreadcrumbs([{ href: "/", label: "Top" }, ...breadcrumbs]);
  }, [router?.asPath]);

  return (
    <nav className="m-4" aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs?.map((path) => {
          return (
            <li key={path.href} className="breadcrumb-item active">
              <Link href={path.href} passHref>
                {path.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
