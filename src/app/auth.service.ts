import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, pipe, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string;

  constructor(private _router: Router, private http: HttpClient, private _snackBar: MatSnackBar) { }

  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isLoggedIn() {
    return localStorage.getItem('token') == 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo';
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  // isTokenExpired(): boolean {
  //   return false;
  // }

  validPermission(url){
     let user = JSON.parse(localStorage.getItem('funcionario'));
     if (url == '/cadastros' || url == '/cadastros/empresas' || url == '/cadastros/usuarios') {
        if (user.acesso != 0) return false;
     }
     if (url == '/liberacao') {
        if (user.acesso == 2) return false;
     }
     return true;
  }


  login(login,senha) {
    interface Data {
      id?: string
    }

    this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/usuario/buscarUsuarioLoginSenha/'+login+'/'+ senha).subscribe((data : Data
    ) =>  {
      localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo`);
      if (data && data.id)
        localStorage.setItem('idFuncionario', data.id);
        localStorage.setItem('funcionario', JSON.stringify(data));
      this._router.navigate(['/home']);
      } ,
      error => {
        this._snackBar.open('Usuário e senha inválidos', null, {
          duration: 3000,
        });
      });
    return ;
  }

  /**
   * this is used to clear local storage and also the route to login
   */
  logout() {
    this.clear();
    this._router.navigate(['/login']);
  }
}