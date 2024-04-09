import { Category } from "./category.model";

export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  slug: string;
  publishedDate: Date;
  author: string;
  isVisible: boolean;
  categories: Category[];
}
