import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css','./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) { }
  username : null;
  password : string;

  ngOnInit() {
  }

  login(){
      this.authService.login(this.username, this.password);
  }

}
