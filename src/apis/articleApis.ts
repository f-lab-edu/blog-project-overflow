import { axiosInstance } from './index';
import { ArticleElements } from 'src/types/article';
export const ARTICLE_URI = '/api/article';
const ARTICLES_URI = '/api/articles';

export const getArticle = async (id: string) => {
  return await axiosInstance.get(ARTICLE_URI, { data: id });
};

export const getArticles = async () => {
  return await axiosInstance.get(ARTICLES_URI);
};

export const createArticle = async (data: ArticleElements) => {
  return await axiosInstance.post(ARTICLE_URI, data);
};

export const updateArticle = async (data: ArticleElements) => {
  return await axiosInstance.put(ARTICLE_URI, data);
};
