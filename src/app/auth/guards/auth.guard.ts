import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  let token = cookieService.get("Authorization");

  if (token) {
    token = token.replace("Bearer ", "");
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(["/login"], {
        queryParams: { returnUrl: state.url },
      });
    } else {

      if (user?.roles.includes("Writer")) {
        return true;
      }

      alert("Unauthorized");
      return router.createUrlTree(["/"], {
        queryParams: { returnUrl: state.url },
      });
    }
  } else {
    authService.logout();
    return router.createUrlTree(["/login"], {
      queryParams: { returnUrl: state.url },
    });
  }
};
