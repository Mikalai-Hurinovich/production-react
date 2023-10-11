import { IArticle } from './article';

export interface ArticleDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: IArticle;
}
