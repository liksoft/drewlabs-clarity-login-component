import { Inject, Injectable, OnDestroy } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, Subject, take, takeUntil, tap } from "rxjs";
import { AUTH_SERVICE } from "../constants";
import { AuthServiceInterface } from "../contracts";
import { TokenGuardType } from "../contracts/guards";

@Injectable()
export class AnyScopeGuard
  implements CanActivate, CanActivateChild, CanLoad, OnDestroy, TokenGuardType
{
  // #region Component properties
  private _destroy$ = new Subject<void>();
  private _scopes: string[] = [];
  // #endregion Component properties

  /**
   * Creates guard instance
   *
   * @param router
   * @param auth
   */
  constructor(
    private router: Router,
    @Inject(AUTH_SERVICE) private auth: AuthServiceInterface
  ) {
    this.auth.signInState$
      .pipe(
        tap((state) => {
          if (state) {
            this._scopes = state.scopes ?? ([] as string[]);
            // TODO: Check if the sope contains the information required
          }
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.tokenCan(next.data["authorizations"], url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    const url = `/${route.path}`;
    const abilities = route?.data ? route?.data["authorizations"] : [];
    return this.tokenCan(abilities, url);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  tokenCan(scopes: string[] | string, redirectTo?: string) {
    return new Promise<boolean>((resolve) => {
      scopes = Array.isArray(scopes) ? scopes : [scopes];
      if (scopes.length === 0) {
        return resolve(true);
      }
      let authorized = false;
      for (const scope of scopes) {
        // We break the loop for the first scope that exist
        // in authorization token scopes
        if (this._scopes.indexOf(scope) !== -1) {
          authorized = true;
          break;
        }
      }
      if (!authorized && redirectTo) {
        this.router.navigateByUrl('/login');
      }
      resolve(authorized);
    })
  }
}
