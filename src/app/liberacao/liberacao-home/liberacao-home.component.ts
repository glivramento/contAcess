import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { LiberacaoService } from '../liberacao.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';


export interface DialogData {
  id : null
  , nome : null
  , empresa : null
  , documento : null
  , celular : null
  , eMail : null
  , veiculoPlaca : false
  , veiculoModelo : false
  , veiculoCor : false
  , edicao : false


}


export interface DialogDataLiberacao {
  dataEntrada : null
  , motivo : null
  , obs : null 
  , periodo : null 
}

@Component({
  selector: 'app-liberacao-home',
  templateUrl: './liberacao-home.component.html',
  styleUrls: ['../../app.component.css','./liberacao-home.component.css'],
  providers: [ LiberacaoService]
})
export class LiberacaoHomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private liberacaoService : LiberacaoService, private _snackBar: MatSnackBar, private authService: AuthService) { }

  data : any;
  search : string;
  idFuncionario: string

  ngOnInit() {
    this.idFuncionario =  localStorage.getItem('idFuncionario');
  }

  logout(){
    this.authService.logout();
  }


    
  back(){
    window.history.back();
  }
  
  abrirModalCadastro(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogDataPessoaDialog, {
      data: {
        id : null
        , nome : null
        , empresa : null
        , documento : null
        , celular : null
        , eMail : null
        , veiculoPlaca : null
        , veiculoModelo : null
        , veiculoCor : null
        // , periodo : ""
        // , dataLiberacao     :     "2019-06-16T18:38:37.809Z"    
        // , dataEntrada     :     "2019-06-16T18:38:37.809Z"    
        // , datadSaida      :       "2019-06-16T18:38:37.809Z"      
        // , motivo      :       ""
        // , obs     :     ""  
        // , entradaPermanente     : false
        // , idUsuarioLiberacao      :  false
        // , idUsuarioPortaria     :  this.idFuncionario
        , idUsuarioCadastro     :  this.idFuncionario
        , edicao : false
        
      }
    });
  }

  searchPessoa(){
    if (this.search && this.search != ''){
      this.liberacaoService.searchPessoa(this.search)
      .subscribe((data) => 
        {
          if (data)
            this.data = data
          else  
          this._snackBar.open('Pessoa não encontrado =(', null, {
            duration: 3000,
          });
        }  ,
      error => {
        this._snackBar.open('Pessoa não encontrado =(', null, {
          duration: 3000,
        });
      }
        
      ); 
    } else {
      this.data = {};
    }
      
  }

  editarPessoa(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogDataPessoaDialog, {
      data: {
        id : this.data.id
        , nome : this.data.nome
        , empresa : this.data.empresa
        , documento : this.data.documento
        , celular : this.data.celular
        , eMail : this.data.eMail
        , veiculoPlaca : this.data.veiculoPlaca
        , veiculoModelo : this.data.veiculoModelo
        , veiculoCor : this.data.veiculoCor
        , edicao : true
      }
    })
    .afterClosed().subscribe(result => {
       if (this.data.id) {
          this.search = '';
          this.searchPessoa();
       }
    });
  }

  criarLiberacao(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogConfirmationDataPessoaDialog, {
      data: {
        id : this.data.id
        ,  idUsuarioCadastro     :  this.idFuncionario
      }
    })
    .afterClosed().subscribe(result => {
       if (this.data.id) {
          this.search = '';
          this.searchPessoa();
       }
    });
  }

  excluirPessoa(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogConfirmationDataPessoaDialog, {
      data: {
        id : this.data.id
        , nome : this.data.nome
      }
    })
    .afterClosed().subscribe(result => {
      if (localStorage.getItem("refresh") == "true" ) {
        this.search = '';
        this.searchPessoa();
      }
    });
  }

}

@Component({
  selector: 'pessoa-dialog',
  templateUrl: 'pessoa-dialog.html',
  providers:  [ LiberacaoService ]
})
export class DialogDataPessoaDialog {
  constructor(public dialog: MatDialog,  private dialogRef: MatDialogRef<DialogDataPessoaDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData,  private liberacaoService : LiberacaoService, private _snackBar: MatSnackBar) {}


  save() {
    this.liberacaoService.savePessoa(this.data)
      .subscribe((data) =>  {
        // if (data.valido) {
          this.dialogRef.close();
          this._snackBar.open('Pessoa salvo com sucesso!', null, {
            duration: 3000,
          });
          this.dialog.open(DialogConfirmationDataPessoaDialog, {
            data: {
              id : this.data.id
              , nome : this.data.nome
              , empresa : this.data.empresa
              , documento : this.data.documento
              , celular : this.data.celular
              , eMail : this.data.eMail
              , veiculoPlaca : this.data.veiculoPlaca
              , veiculoModelo : this.data.veiculoModelo
              , veiculoCor : this.data.veiculoCor
              , edicao : true
            }
          })
          .afterClosed().subscribe(result => {
            //  if (this.data.id) {
            //     // this.search = '';
            //     // this.searchPessoa();
            //  }
          });
        //}
      } 
      );
    }
}

@Component({
  selector: 'liberacao-dialog',
  templateUrl: 'liberacao-dialog.html',
  providers:  [ LiberacaoService ]
})
export class DialogConfirmationDataPessoaDialog {
  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<DialogConfirmationDataPessoaDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogDataLiberacao,  private liberacaoService : LiberacaoService, private _snackBar: MatSnackBar) {}


  criarLiberacao() {
    this.liberacaoService.criarLiberacao(this.data)
      .subscribe((data) =>  {
          localStorage.setItem("refresh", "true");
          this.dialogRef.close();
          this._snackBar.open('Liberação criada com com sucesso!', null, {
            duration: 3000,
          });
      } ,
      error => {
        this._snackBar.open('Ocorreu um problema na criação da liberação', null, {
          duration: 3000,
        });
      });
  }

}
