import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { MarkdownModule } from "ngx-markdown";
import { SharedModule } from "../shared/shared.module";
import { AddBlogpostComponent } from "./blog-post/add-blogpost/add-blogpost.component";
import { BlogpostListComponent } from "./blog-post/blogpost-list/blogpost-list.component";
import { EditBlogpostComponent } from "./blog-post/edit-blogpost/edit-blogpost.component";
import { AddCategoryComponent } from "./category/add-category/add-category.component";
import { CategoryListComponent } from "./category/category-list/category-list.component";
import { EditCategoryComponent } from "./category/edit-category/edit-category.component";
import { FeaturesRoutingModule } from "./features-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    FormsModule,
    MarkdownModule,
    SharedModule,
  ],
  declarations: [
    AddBlogpostComponent,
    BlogpostListComponent,
    EditBlogpostComponent,
    AddCategoryComponent,
    CategoryListComponent,
    EditCategoryComponent,
  ],
  exports: [
    AddBlogpostComponent,
    BlogpostListComponent,
    EditBlogpostComponent,
    AddCategoryComponent,
    CategoryListComponent,
    EditCategoryComponent,
  ],
})
export class FeaturesModule {}
