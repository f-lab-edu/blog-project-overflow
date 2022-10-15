import React from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { connectMongo } from 'pages/api/middlewares/connectMongo';
import ArticleModel from 'pages/api/models/articleModel';

import { ArticleList } from 'src/components';
import { getPlaiceholder } from 'plaiceholder';

export type ArticleT = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
  imgUrl: string;
  blurDataURL: string;
};

const ArticlePage = ({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ArticleList articles={articles} />;
};

export default ArticlePage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    console.log('CONNECTING TO MONGO IN ARTICLE PAGE');
    await connectMongo();
    console.log('CONNECTED TO MONGO IN ARTICLE PAGE');

    console.log('FETCHING DATA IN ARTICLE PAGE');
    const res = await ArticleModel.find();
    console.log('FETCHED DATA IN ARTICLE PAGE');

    const articles = JSON.parse(JSON.stringify(res));

    const articlesWithBlurURL = await Promise.all(
      articles.map(async (article: ArticleT) => {
        const { base64 } = await getPlaiceholder(article.imgUrl);
        return { ...article, blurDataURL: base64 };
      }),
    );
    return {
      props: {
        articles: articlesWithBlurURL,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
