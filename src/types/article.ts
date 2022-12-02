import { AxiosResponse } from 'axios';

export interface ArticleElement {
  status?: number;
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  imgUrl: string;
  content: string;
  createdAt?: string;
  category: ArticleCategory;
}
export interface ViewArticleElement extends Omit<ArticleElement, 'category'> {
  blurDataURL: string;
  createdAt: string;
}

export type UseArticleElement = () => Return;

type Return = {
  articleElements: ArticleElement;
  setArticleElement: HandleArticleElementFunction;
};

export type HandleArticleElementFunction = (
  arg: Partial<ArticleElement>,
) => void;

export type SaveArticleFunction = (
  data: ArticleElement,
) => (category: ArticleCategory) => Promise<AxiosResponse<any, any>>;

export type ArticleCategory = 'programming' | 'book' | 'essay';
