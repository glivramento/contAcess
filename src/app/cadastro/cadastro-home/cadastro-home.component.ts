import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-cadastro-home',
  templateUrl: './cadastro-home.component.html',
  styleUrls: ['../../app.component.css','./cadastro-home.component.css']
})
export class CadastroHomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  back(){
    window.history.back();
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit() {
  }

}
