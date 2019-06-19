import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { CadastroService } from '../cadastro.service';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface DialogData {
  id : null
  , login : null
  , senha : null
  , nome : null
  , cargo : null
  , celular : null
  , edicao : false
}


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers:  [ CadastroService ]
})

export class UsuarioComponent implements OnInit {
  constructor(public dialog: MatDialog, private cadastroService : CadastroService, private _snackBar: MatSnackBar) { }
  data : any;
  search : string;

  ngOnInit() {
  }

    
  back(){
    window.history.back();
  }
  
  abrirModalCadastro(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogDataUsuarioDialog, {
      data: {
        id : null
        , login : null
        , senha : null
        , nome : null
        , cargo : null
        , celular : null
        , edicao : false
      }
    });
  }

  searchUsuario(){
    if (this.search && this.search != ''){
      this.cadastroService.searchUsuario(this.search)
      .subscribe((data) => 
        {
          if (data)
            this.data = data
          else  
          this._snackBar.open('Usuario não encontrado =(', null, {
            duration: 3000,
          });
        }  ,
      error => {
        this._snackBar.open('Usuario não encontrado =(', null, {
          duration: 3000,
        });
      }
        
      ); 
    } else {
      this.data = {};
    }
      
  }

  editarUsuario(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogDataUsuarioDialog, {
      data: {
        id : this.data.id
        , login : this.data.login
        , senha : this.data.senha
        , nome : this.data.nome
        , cargo : this.data.cargo
        , celular : this.data.celular
        , edicao : true
      }
    })
    .afterClosed().subscribe(result => {
       if (this.data.id) {
          this.search = '';
          this.searchUsuario();
       }
    });
  }

  excluirUsuario(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogConfirmationDataUsuarioDialog, {
      data: {
        id : this.data.id
        , nome : this.data.nome
      }
    })
    .afterClosed().subscribe(result => {
      if (localStorage.getItem("refresh") == "true" ) {
        this.search = '';
        this.searchUsuario();
      }
    });
  }

}

@Component({
  selector: 'usuario-dialog',
  templateUrl: 'usuario-dialog.html',
  providers:  [ CadastroService ]
})
export class DialogDataUsuarioDialog {
  constructor( private dialogRef: MatDialogRef<DialogDataUsuarioDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData,  private cadastroService : CadastroService, private _snackBar: MatSnackBar) {}


  save() {
    this.cadastroService.saveUsuario(this.data)
      .subscribe((data) =>  {
        // if (data.valido) {
          this.dialogRef.close();
          this._snackBar.open('Usuario salvo com sucesso!', null, {
            duration: 3000,
          });
        //}
      } 
      );
    }
}

@Component({
  selector: 'usuario-delete-dialog',
  templateUrl: 'usuario-delete-dialog.html',
  providers:  [ CadastroService ]
})
export class DialogConfirmationDataUsuarioDialog {
  constructor( private dialogRef: MatDialogRef<DialogConfirmationDataUsuarioDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData,  private cadastroService : CadastroService, private _snackBar: MatSnackBar) {}


  delete() {
    this.cadastroService.deleteUsuario(this.data.id)
      .subscribe((data) =>  {
          localStorage.setItem("refresh", "true");
          this.dialogRef.close();
          this._snackBar.open('Usuario deletado com sucesso!', null, {
            duration: 3000,
          });
      } ,
      error => {
        this._snackBar.open('Ocorreu um problema na deleção', null, {
          duration: 3000,
        });
      });
  }
}
