import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/services/auth.service";
import { RegisterRequest, RegisterResponse } from "../models";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  model: RegisterRequest;
  showPassword: boolean = false;

  @ViewChild("password")
  passwordInput!: ElementRef<HTMLInputElement>;

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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordInput.nativeElement.type = "text";
    } else {
      this.passwordInput.nativeElement.type = "password";
    }
  }

  onSubmit() {
    this.authService.register(this.model).subscribe({
      next: ({ email, roles, token }: RegisterResponse) => {
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
      error: (err) => {
        console.log(err);
      },
    });
  }
}
