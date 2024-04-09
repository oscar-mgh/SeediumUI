import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "../../models";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
})
export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }
}
