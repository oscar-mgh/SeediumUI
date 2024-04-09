import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { BlogPostService } from "src/app/services/blogpost.service";
import { BlogPost } from "../../../features/models";

@Component({
  selector: "app-blog-details",
  templateUrl: "./blog-details.component.html",
})
export class BlogDetailsComponent implements OnInit {
  url: string | undefined = undefined;
  blogPost$?: Observable<BlogPost>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogPostService: BlogPostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.url = params["slug"];
    });

    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostBySlug(this.url);
    }
  }
}
