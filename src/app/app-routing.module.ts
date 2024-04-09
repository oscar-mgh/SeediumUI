import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogDetailsComponent } from "./core/components/blog-details/blog-details.component";
import { HomeComponent } from "./core/components/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "blog/:slug", component: BlogDetailsComponent },
  {
    path: "admin",

    loadChildren: () =>
      import("./features/features.module").then((m) => m.FeaturesModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
