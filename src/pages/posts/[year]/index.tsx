import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";
import { listFiles } from "@/lib/listFiles";
import { listDirs } from "@/lib/listDirs";

type Post = {
  slug: string;
  frontMatter: { [key: string]: any };
};

const Page = ({
  posts,
  year,
  months,
}: {
  posts: Post[];
  year: string;
  months: string[];
}) => {
  return (
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
      <hr />
      <ul>
        {months.map((month) => {
          return (
            <li key={month}>
              <Link href={`/posts/${year}${month}`}>
                {month.replace("/", "")}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default Page;

export const getStaticProps = async ({
  params: { year },
}: {
  params: { year: string };
}) => {
  // list year posts
  const dirname = "./src/pages/posts" + `/${year}/`;
  const files = listFiles(dirname);
  const posts = files
    .filter((filename) => {
      return filename.endsWith("mdx");
    })
    .filter((filename) => {
      return !filename.endsWith("index.tsx");
    })
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("./", filename),
        "utf-8"
      );
      const { data: frontMatter } = matter(markdownWithMeta);
      return {
        frontMatter,
        slug: year + filename.split(dirname)[1].split(".")[0],
      };
    })
    .reverse();

  // list months
  const months = listDirs(dirname)
    .filter((dirpath) => {
      return !dirpath.endsWith("]");
    })
    .map((dirpath) => {
      return dirpath.replace(dirname, "");
    })
    .reverse();

  return {
    props: {
      posts,
      year,
      months,
    },
  };
};

export const getStaticPaths = async () => {
  const dirname = "./src/pages/posts";
  const years = listDirs(dirname)
    .filter((yeardir) => {
      return !yeardir.endsWith("]");
    })
    .map((yeardir) => {
      const year = yeardir.replace(dirname, "");
      return { params: { year: year.replace("/", "") } };
    });
  return {
    paths: years,
    fallback: false,
  };
};
