import Head from 'next/head';

type HeadTitleProps = {
  title: string;
};

const HeadTitle = ({ title }: HeadTitleProps) => (
  <Head>
    <title>HerMoney | {title}</title>
  </Head>
);

export default HeadTitle;
