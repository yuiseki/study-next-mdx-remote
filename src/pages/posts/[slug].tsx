import Head from "next/head";

// for getStaticXXX
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import "bootstrap/dist/css/bootstrap.min.css";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

// remark
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// rehype
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import Link from "next/link";
import {
  BlockquoteHTMLAttributes,
  ClassAttributes,
  TableHTMLAttributes,
} from "react";

const components = {
  table: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLTableElement> &
      TableHTMLAttributes<HTMLTableElement>
  ) => (
    <table
      className="table w-auto table-dark table-striped table-hover"
      {...props}
    />
  ),
  blockquote: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLQuoteElement> &
      BlockquoteHTMLAttributes<HTMLQuoteElement>
  ) => <blockquote className="blockquote text-muted" {...props} />,
};

const PostPage = ({
  frontMatter: { title },
  mdxSource,
}: {
  frontMatter: { title: string };
  mdxSource: MDXRemoteSerializeResult;
}) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/tokyo-night-dark.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
          integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="container-fluid">
        <div className="m-4">
          <Link href="/">Top</Link> &gt; <Link href="/posts">Posts</Link>
        </div>
        <div className="container-fluid px-5">
          <h1>{title}</h1>
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </div>
    </>
  );
};
export default PostPage;

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("./posts", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeHighlight, rehypeKatex],
    },
  });
  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "test" } }],
    fallback: false,
  };
};
