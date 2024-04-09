import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, switchMap, tap } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { ImageService } from "src/app/shared/components/image-selector/image.service";
import { BlogPostService } from "../../../services/blogpost.service";
import { BlogPost, Category } from "../../models";
import { UpdateBlogPostRequest } from "../../models/update-blogpost-request.model";

@Component({
  selector: "app-edit-blogpost",
  templateUrl: "./edit-blogpost.component.html",
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  model?: BlogPost;
  blogPostId!: string;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;
  isUnexpectedError: boolean = false;

  blogPostSubscription$?: Subscription;
  imageSelectSubscription$?: Subscription;
  deleteBlogPostSubscription$?: Subscription;
  updateBlogPostSubscription$?: Subscription;

  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly categoryService: CategoryService,
    private readonly imageService: ImageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  onSubmit() {
    if (this.model) {
      const updatedBlogPost: UpdateBlogPostRequest = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        slug: this.model.slug,
        publishedDate: this.model.publishedDate,
        author: this.model.author,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ?? [],
      };

      this.updateBlogPostSubscription$ = this.blogPostService
        .updateBlogPost(this.model.id, updatedBlogPost)
        .subscribe({
          next: _ => this.router.navigateByUrl("/admin/blogposts"),
          error: _ => this.isUnexpectedError = true,
        });
    }
  }

  deleteBlogPost(id: string) {
    this.deleteBlogPostSubscription$ = this.blogPostService
      .deleteBlogPost(id)
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/admin/blogposts");
        },
        error: (_) => {
          this.isUnexpectedError = true;
        },
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
    this.blogPostSubscription$ = this.route.params
      .pipe(
        tap((params) => (this.blogPostId = params["id"])),
        switchMap(() => this.blogPostService.getBlogPostById(this.blogPostId))
      )
      .subscribe({
        next: (blogPost) => {
          this.model = blogPost;
          this.selectedCategories = blogPost.categories.map(
            (x: Category) => x.id
          );
        },
      });
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
    this.blogPostSubscription$?.unsubscribe();
    this.imageSelectSubscription$?.unsubscribe();
    this.deleteBlogPostSubscription$?.unsubscribe();
    this.updateBlogPostSubscription$?.unsubscribe();
  }
}
