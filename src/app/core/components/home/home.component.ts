import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BlogPostService } from "src/app/services/blogpost.service";
import { BlogPost } from "../../../features/models";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]>;

  constructor(private readonly blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getBlogPosts();
  }
}
