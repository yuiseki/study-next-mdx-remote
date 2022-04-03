import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { Breadcrumb } from "@/components/Breadcrumb";

const HomePage = () => {
  return (
    <section>
      <ul>
        <li>
          <Link href="posts">Posts</Link>
        </li>
      </ul>
    </section>
  );
};
export default HomePage;
