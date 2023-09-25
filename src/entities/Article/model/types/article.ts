export enum BlockTypeEnum {
    TEXT = 'TEXT',
    CODE = 'CODE',
    IMAGE = 'IMAGE'
}

export interface IArticleBlock {
    id: string;
    type: BlockTypeEnum;
}

export enum ArticleTypeEnum {
    IT = 'IT',
    NEWS = 'IT',
    SOCIETY = 'SOCIETY',
    ECONOMICS = 'ECONOMICS',
    SCIENCE = 'SCIENCE',
}

export interface IArticleTextBlock extends IArticleBlock {
    title: string;
    paragraphs: string[];
    type: BlockTypeEnum.TEXT;
}

export interface IArticleCodeBlock extends IArticleBlock {
    type: BlockTypeEnum.CODE;
    code: string;
}

export interface IArticleImageBlock extends IArticleBlock {
    type: BlockTypeEnum.IMAGE;
    src: string;
    title: string;
}

export type ArticleBlockType = IArticleTextBlock | IArticleCodeBlock | IArticleImageBlock;

export interface IArticle {
    id: string;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleTypeEnum[];
    blocks: ArticleBlockType[];
}

export interface ArticleSchema {
    isLoading: boolean;
    error?: string;
    data?: IArticle;
}
