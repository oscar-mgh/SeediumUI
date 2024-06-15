import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "../auth/models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, request);
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, request);
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem("user-email", user.email);
    localStorage.setItem("user-roles", user.roles.join(","));
  }

  User(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem("user-email");
    const roles = localStorage.getItem("user-roles");
    if (email && roles) {
      const user: User = {
        email,
        roles: roles.split(","),
      };
      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete("Authorization", "/");
    this.$user.next(undefined);
  }
}
