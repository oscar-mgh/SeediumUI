import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BlogPostService } from "src/app/services/blogpost.service";
import { BlogPost } from "../../models";

@Component({
  selector: "app-blogpost-list",
  templateUrl: "./blogpost-list.component.html",
})
export class BlogpostListComponent implements OnInit {
  blogPosts$!: Observable<BlogPost[]>;

  constructor(private readonly blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getBlogPosts();
  }
}
