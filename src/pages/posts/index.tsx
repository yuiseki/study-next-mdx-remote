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
  yearsAndMonths,
}: {
  posts: Post[];
  yearsAndMonths: Array<{ [key: string]: string[] }>;
}) => {
  return (
    <section>
      <ul>
        {posts.map(({ slug, frontMatter }) => (
          <li key={slug}>
            <Link href={`/posts${slug}`}>
              <a>{frontMatter.title}</a>
            </Link>
            <br />
            <small>{frontMatter.date}</small>
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        {yearsAndMonths.map((yearObj, idx) => {
          const year = Object.keys(yearObj)[0];
          return (
            <li key={year}>
              <Link href={`/posts${year}`}>{year.replace("/", "")}</Link>
              <ul>
                {yearObj[year].map((month: string) => {
                  return (
                    <li key={year + "-" + month}>
                      <Link href={`/posts${year}${month}`}>
                        {month.replace(`${year}/`, "")}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default Page;

export const getStaticProps = async () => {
  // list all posts
  const dirname = "./src/pages/posts/";
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
        slug: filename.split(dirname)[1].split(".")[0],
      };
    })
    .reverse();

  // list years
  const yearsAndMonths = listDirs(dirname)
    .filter((yeardir) => {
      return !yeardir.endsWith("]");
    })
    .filter((filename) => {
      return !filename.endsWith("index.tsx");
    })
    .map((yeardir) => {
      const year = yeardir.replace(dirname, "");
      const months = listDirs(yeardir)
        .map((dir) => {
          return dir.replace(dirname + year, "");
        })
        .reverse();

      return { [year]: months };
    })
    .reverse();
  console.log(yearsAndMonths);

  return {
    props: {
      posts,
      yearsAndMonths,
    },
  };
};
