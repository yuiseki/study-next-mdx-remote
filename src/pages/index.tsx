import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <div className="m-4">Top</div>
      <section>
        <ul>
          <li>
            <Link href="posts">Posts</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};
export default HomePage;
