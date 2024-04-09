import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/auth/models";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  user?: User;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.User().subscribe({
      next: (res) => {
        this.user = res;
      },
    });

    this.user = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }
}
