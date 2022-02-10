interface ArticleListModel {
  id: string;
  key?: number;
  articleId?: number;
  image: string | null;
  publishedAt: string;
  title: string;
  description: string;
  content: string;
  url: string;
  keyword?: string;
  wordRateTitle: number;
  wordRateDescription: number;
}
export default ArticleListModel;
