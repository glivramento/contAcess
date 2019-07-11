import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar)
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

      if(!this.authService.validPermission(state.url)){
        this._snackBar.open('Acesso negado', null, {
          duration: 3000,
        });
        return this.router.parseUrl("/home");
      }
      
    if(this.authService.isLoggedIn()){
      return true;
    }
    else{
      return this.router.parseUrl("/login");
    }

  }
}