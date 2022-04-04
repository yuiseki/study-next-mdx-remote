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

const Page = ({ posts }: { posts: Post[] }) => {
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
    </section>
  );
};
export default Page;

export const getStaticProps = async ({
  params: { year, month },
}: {
  params: { year: string; month: string };
}) => {
  const dirname = "./src/pages/posts" + `/${year}/${month}`;
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
        slug: year + month + filename.split(dirname)[1].split(".")[0],
      };
    });
  return {
    props: {
      posts,
    },
  };
};

export const getStaticPaths = async () => {
  const dirname = "./src/pages/posts";
  const yearsAndMonths = listDirs(dirname)
    .filter((yeardir) => {
      return !yeardir.endsWith("]");
    })
    .map((yeardir) => {
      const year = yeardir.replace(dirname, "");
      const months = listDirs(yeardir);
      return months.map((month) => {
        return {
          params: {
            year: year.replace("/", ""),
            month: month.replace(dirname + year + "/", ""),
          },
        };
      });
    });
  return {
    paths: yearsAndMonths.flat(),
    fallback: false,
  };
};
