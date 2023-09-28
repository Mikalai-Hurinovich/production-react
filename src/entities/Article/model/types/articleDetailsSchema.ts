import { IArticle } from 'entities/Article';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: IArticle;
}
