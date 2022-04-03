import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

type Post = {
  slug: string;
  frontMatter: { [key: string]: any };
};

const HomePage = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="container-fluid">
      <div className="m-4">
        <Link href="/">Top</Link> &gt; Posts
      </div>
      <section>
        <ul>
          {posts.map(({ slug, frontMatter }) => (
            <li key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{frontMatter.title}</a>
              </Link>
              <br />
              <small>{frontMatter.date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default HomePage;

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.resolve("./posts/"));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("./posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });
  return {
    props: {
      posts,
    },
  };
};
