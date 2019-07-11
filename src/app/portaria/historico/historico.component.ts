import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { PortariaService } from '../portaria.service';
import { AuthService } from '../../auth.service';
import {MatTableDataSource} from '@angular/material/table';

export interface Liberacao {
  periodo: string;
  motivo: string;
  codigoAcesso: string;
  dataLiberacao: string;
}

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['../../app.component.css','./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  constructor(private portariaService : PortariaService, private _snackBar: MatSnackBar, private authService: AuthService) { }
  list : any;
  ngOnInit() {

  }

  back(){
    window.history.back();
  }


  logout(){
    this.authService.logout();
  }


}

@Component({
  selector: 'table-historico-liberacoes',
  templateUrl: 'table-historico-liberacoes.html',
  providers:  [ PortariaService ]
})
export class TableHistoricoFilteringExample {
  constructor(private portariaService : PortariaService, private _snackBar: MatSnackBar) {}
  list : any;
  displayedColumns: string[] = ['nome', 'documento', 'usuarioLiberacao', 'obs' , 'periodo', 'motivo', 'codigoAcesso', 'dataLiberacao', 'dataEntrada'];
  dataSource = new MatTableDataSource(this.list);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  this.portariaService.listarHistoricoLiberacoes()
  .subscribe((data) => 
    {
      console.log('veio', data);
      if (data) {
        this.list = data
        this.dataSource =  new MatTableDataSource(this.list);
      }
      else  
      this._snackBar.open('QR Code não encontrado =(', null, {
        duration: 3000,
      });
    }  ,
  error => {
    this._snackBar.open('QR Code não encontrado =(', null, {
      duration: 3000,
    });
  });

  }

  liberarAcesso(element){
    this.portariaService.liberarAcesso(21, element.id )
    .subscribe((data) => 
      {
        console.log('veio', data);
        if (data) {
          this._snackBar.open('Liberação realizada com sucesso', null, {
          });
          this.portariaService.listarHistoricoLiberacoes()
          .subscribe((data) => 
            {
              console.log('veio', data);
              if (data) {
                this.list = data
                this.dataSource =  new MatTableDataSource(this.list);
              }
              else  
              this._snackBar.open('QR Code não encontrado =(', null, {
                duration: 3000,
              });
            }  ,
          error => {
            this._snackBar.open('QR Code não encontrado =(', null, {
              duration: 3000,
            });
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