import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';
import { AddBlogpostComponent } from './blog-post/add-blogpost/add-blogpost.component';
import { BlogpostListComponent } from './blog-post/blogpost-list/blogpost-list.component';
import { EditBlogpostComponent } from './blog-post/edit-blogpost/edit-blogpost.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: "categories",
    component: CategoryListComponent,
    canActivate: [authGuard],
  },
  {
    path: "categories/add",
    component: AddCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: "categories/edit/:id",
    component: EditCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: "blogposts",
    component: BlogpostListComponent,
    canActivate: [authGuard],
  },
  {
    path: "blogposts/add",
    component: AddBlogpostComponent,
    canActivate: [authGuard],
  },
  {
    path: "blogposts/edit/:id",
    component: EditBlogpostComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
