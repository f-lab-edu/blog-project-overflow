import { atom } from 'recoil';
import { ArticleElement } from 'src/types/article';
export const articleState = atom<ArticleElement>({
  key: 'articleState',
  default: {
    title: '',
    content: '',
    tags: [],
    description: '',
    imgUrl: '',
    time: '2022.10.23 · 7min read',
  },
});

export const filteredArticleStates = atom<ArticleElementsType[]>({
  key: 'filteredArticleStates',
  default: [],
});
export const detailPageState = atom<ArticleElement>({
  key: 'detailPageState',
  default: {
    _id: '',
    title: '',
    content: '',
    tags: [],
    description: '',
    imgUrl: '',
    time: '2022.10.23 · 7min read',
  },
});

export const writeStates = atom<'create' | 'update'>({
  key: 'writeStates',
  default: 'create',
});

export const tagStates = atom<string[]>({
  key: 'tagState',
  default: [],
});
