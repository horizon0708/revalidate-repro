import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <div>fixed</div>
      {props.n}
    </>
  );
}

export const getStaticProps: GetStaticProps<{ n: number }> = async (
  context
) => {
  console.log("getstaticpropscalled");
  return {
    props: {
      n: Math.random(),
    },
    revalidate: false,
  };
};
