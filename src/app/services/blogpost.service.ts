import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { AddBlogPostRequest, BlogPost } from "../features/models";
import { UpdateBlogPostRequest } from "../features/models/update-blogpost-request.model";

@Injectable({ providedIn: "root" })
export class BlogPostService {
  private baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.baseUrl}/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.baseUrl}/blogposts/${id}`);
  }

  getBlogPostBySlug(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.baseUrl}/blogposts/${slug}`);
  }

  createBlogPost(data: AddBlogPostRequest): Observable<BlogPost> {
    return this.http.post<BlogPost>(
      `${this.baseUrl}/blogposts?addAuth=true`,
      data
    );
  }

  updateBlogPost(id: string, model: UpdateBlogPostRequest) {
    return this.http.put<BlogPost>(
      `${this.baseUrl}/blogposts/${id}?addAuth=true`,
      model
    );
  }

  deleteBlogPost(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/blogposts/${id}?addAuth=true`
    );
  }
}
