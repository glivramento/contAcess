import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-home',
  templateUrl: './cadastro-home.component.html',
  styleUrls: ['./cadastro-home.component.css']
})
export class CadastroHomeComponent implements OnInit {

  constructor() { }

  back(){
    window.history.back();
  }

  ngOnInit() {
  }

}
