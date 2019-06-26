import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, filter, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../shared/store/app.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuthenticated)
      .pipe( filter(isAuthenticated => isAuthenticated != null) )
      .pipe( take(1) )
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['/login']);
          }
        })
      )
    ;
  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuthenticated)
      .pipe( filter(isAuthenticated => isAuthenticated != null) )
      .pipe( take(1) )
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['/login']);
          }
        })
      )
    ;

  }
}
