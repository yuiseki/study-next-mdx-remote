import nextMdx from "@next/mdx";

// remark
import remarkFrontmatter from "remark-frontmatter";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// rehype
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "frontmatter" }],
      remarkGfm,
      remarkMath,
    ],
    rehypePlugins: [rehypeHighlight, rehypeKatex],
  },
});
export default withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  basePath: "/study-nextjs-mdx",
});
