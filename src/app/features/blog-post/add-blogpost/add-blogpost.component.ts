import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { BlogPostService } from "src/app/services/blogpost.service";
import { CategoryService } from "src/app/services/category.service";
import { ImageService } from "src/app/shared/components/image-selector/image.service";
import { AddBlogPostRequest, Category } from "../../models";

@Component({
  selector: "app-add-blogpost",
  templateUrl: "./add-blogpost.component.html",
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  isImageSelectorVisible: boolean = false;
  model: AddBlogPostRequest;
  isUnexpectedError: boolean = false;
  categories$?: Observable<Category[]>;
  imageSelectSubscription$?: Subscription;

  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly categoryService: CategoryService,
    private readonly imageService: ImageService,
    private readonly router: Router
  ) {
    this.model = {
      title: "",
      shortDescription: "",
      content: "",
      slug: "",
      featuredImageUrl: "",
      publishedDate: new Date(),
      author: "",
      isVisible: false,
      categories: [],
    };
  }

  onSubmit() {
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: _ => this.router.navigateByUrl("/admin/blogposts"),
      error: _ => this.isUnexpectedError = true,
    });
  }

  openImageSelector() {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.imageSelectSubscription$ = this.imageService
      .onSelectedImage()
      .subscribe((image) => {
        if (this.model) {
          this.model.featuredImageUrl = image.url;
          this.isImageSelectorVisible = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription$?.unsubscribe();
  }
}
