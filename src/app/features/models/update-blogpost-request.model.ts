export interface UpdateBlogPostRequest {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  slug: string;
  publishedDate: Date;
  author: string;
  isVisible: boolean;
  categories: string[];
}
