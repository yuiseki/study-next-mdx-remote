import Head from "next/head";

export const Frontmatter: React.VFC<{ frontmatter: { title: string } }> = ({
  frontmatter,
}) => {
  return (
    <>
      <Head>
        <title>{frontmatter.title} - sitename</title>
      </Head>
    </>
  );
};
