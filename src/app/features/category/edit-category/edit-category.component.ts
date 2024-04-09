import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, switchMap, tap } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "../../models";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  category?: Category;
  categoryId!: string;
  paramsSubscription$?: Subscription;
  isUnexpectedError: boolean = false;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  onSubmit() {
    if (this.category) {
      this.categoryService.updateCategory(this.category).subscribe({
        next: () => {
          this.router.navigateByUrl("/admin/categories");
        },
        error: _ => this.isUnexpectedError = true,
      });
    }
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.router.navigateByUrl("/admin/categories");
      },
      error: (_) => {
        this.isUnexpectedError = true;
      },
    });
  }

  ngOnInit(): void {
    this.paramsSubscription$ = this.route.params
      .pipe(
        tap((params) => (this.categoryId = params["id"])),
        switchMap(() => this.categoryService.getCategoryById(this.categoryId))
      )
      .subscribe({
        next: (category) => {
          this.category = category;
        },
        error: (_) => {
          this.isUnexpectedError = true;
        },
      });
  }

  ngOnDestroy(): void {
    this.paramsSubscription$?.unsubscribe();
  }
}
