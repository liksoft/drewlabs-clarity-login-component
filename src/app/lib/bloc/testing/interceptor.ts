import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

export class TestAuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Vérifier si la valeur du token est pas défini
    // Si la valeur du token d'authentification est défini
    // Modifier la requête en passant l'entête d'authorization
    // récupéré depuis le service de gestion des token
    req = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${environment.testing._authToken}`),
    });
    return next.handle(req);
  }
}
