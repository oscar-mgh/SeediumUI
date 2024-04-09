import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/services/auth.service";
import { LoginResponse } from "../models";
import { LoginRequest } from "../models/login-request.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  model: LoginRequest;
  isWrongCredentials: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {
    this.model = {
      email: "",
      password: "",
    };
  }

  onSubmit() {
    this.authService.login(this.model).subscribe({
      next: ({ email, roles, token }: LoginResponse) => {
        this.cookieService.set(
          "Authorization",
          `Bearer ${token}`,
          undefined,
          "/",
          undefined,
          true,
          "Strict"
        );

        this.authService.setUser({
          email,
          roles,
        });

        this.router.navigateByUrl("/");
      },
      error: _ => this.isWrongCredentials = true,
    });
  }
}
