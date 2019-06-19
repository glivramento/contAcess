import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { PortariaService } from '../portaria.service';


@Component({
  selector: 'app-portaria-home',
  templateUrl: './portaria-home.component.html',
  styleUrls: ['./portaria-home.component.css']
})
export class PortariaHomeComponent implements OnInit {
  search : string;
  data : any;

  constructor(public dialog: MatDialog, private portariaService : PortariaService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
     this.data = {};
  }

  back(){
    window.history.back();
  }

  searchQrCode(){
    if (this.search && this.search != ''){
      this.portariaService.searchQrCode(this.search)
      .subscribe((data) => 
        {
          console.log('veio', data);
          if (data)
            this.data = data
          else  
          this._snackBar.open('QR Code não encontrado =(', null, {
            duration: 3000,
          });
        }  ,
      error => {
        this._snackBar.open('QR Code não encontrado =(', null, {
          duration: 3000,
        });
      }
        
      ); 
    } else {
      this.data = {};
    }
      
  }

  liberarAcesso(){
      this.portariaService.liberarAcesso(21, this.data.id )
      .subscribe((data) => 
        {
          console.log('veio', data);
          if (data) {
            this.data = data
            this._snackBar.open('Liberação realizada com sucesso', null, {
            });
          }
        }  ,
      error => {
        this._snackBar.open('Ocorreu um problema com a liberação, tente novamente em breve', null, {
          duration: 3000,
        });
      }
        
      ); 
  }

}
