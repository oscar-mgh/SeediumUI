import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { AddCategoryRequest } from "../../models";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
})
export class AddCategoryComponent implements OnDestroy {
  model: AddCategoryRequest;
  isUnexpectedError: boolean = false;
  private addCategorySubscription?: Subscription;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router
  ) {
    this.model = {
      name: "",
      slug: "",
    };
  }

  onSubmit() {
    this.categoryService.createCategory(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl("/admin/categories");
      },
      error: _ => this.isUnexpectedError = true,
    });
  }

  ngOnDestroy() {
    this.addCategorySubscription?.unsubscribe();
  }
}
