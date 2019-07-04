import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  selector: 'app-entrada-sem-qrcode',
  templateUrl: './entrada-sem-qrcode.component.html',
  styleUrls: ['../../app.component.css','./entrada-sem-qrcode.component.css']
})
export class EntradaSemQrcodeComponent implements OnInit {

  constructor( private portariaService : PortariaService, private _snackBar: MatSnackBar, private authService: AuthService) { }
  list : any;
  ngOnInit() {
    // this.portariaService.listarLiberacoesPendentes()
    //   .subscribe((data) => 
    //     {
    //       console.log('veio', data);
    //       if (data)
    //         this.list = data
    //       else  
    //       this._snackBar.open('QR Code não encontrado =(', null, {
    //         duration: 3000,
    //       });
    //     }  ,
    //   error => {
    //     this._snackBar.open('QR Code não encontrado =(', null, {
    //       duration: 3000,
    //     });
    //   });
  }

  back(){
    window.history.back();
  }


  logout(){
    this.authService.logout();
  }


}

@Component({
  selector: 'table-liberacoes-pendentes',
  templateUrl: 'table-liberacoes-pendentes.html',
  providers:  [ PortariaService ]
})
export class TableFilteringExample {
  constructor(private portariaService : PortariaService, private _snackBar: MatSnackBar) {}
  list : any;
  displayedColumns: string[] = ['periodo', 'motivo', 'codigoAcesso', 'dataLiberacao'];
  dataSource = new MatTableDataSource(this.list);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  this.portariaService.listarLiberacoesPendentes()
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
}
