import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { AddCategoryRequest, Category } from "../features/models";

@Injectable({ providedIn: "root" })
export class CategoryService {
  private baseUrl = environment.baseUrl;

  constructor(
    private readonly http: HttpClient,
  ) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  createCategory(model: AddCategoryRequest): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories?addAuth=true`, model);
  }

  updateCategory(model: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${model.id}?addAuth=true`, model);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}?addAuth=true`);
  }
}
