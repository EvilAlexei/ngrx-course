import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.pipe(
    select(isLoggedIn),
    tap(loggedIn => {
      if (!loggedIn) {
        router.navigateByUrl('/login');
      }
    })
  );
};
