import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { CadastroService } from '../cadastro.service';
import { AuthService } from '../../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface DialogData {
  id : null
  , razaoSocial: null
  , nomeFantasia : null
  , cnpj : null
  , ie : null
  , eMail : null
  , telefone : null
  , cep : null
  , logradouro : null
  , numero : null
  , bairro : null
  , complemento : null
  , cidade : null
  , uf : null
  , edicao : false
}


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['../../app.component.css','./empresa.component.css'],
  providers:  [ CadastroService ]
})

export class EmpresaComponent implements OnInit {
  constructor(public dialog: MatDialog, private cadastroService : CadastroService, private _snackBar: MatSnackBar, private authService: AuthService) { }
  data : any;

  search : string;

  ngOnInit() {
  }
  
  back(){
    window.history.back();
  }

  logout(){
    this.authService.logout();
  }

  abrirModalCadastro(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        id : null
        , razaoSocial: null
        , nomeFantasia : null
        , cnpj : null
        , ie : null
        , eMail : null
        , telefone : null
        , cep : null
        , logradouro : null
        , numero : null
        , bairro : null
        , complemento : null
        , cidade : null
        , uf : null
        , edicao : false
      }
    });
  }

  searchEmpresa(){
    if (this.search && this.search != ''){
      this.cadastroService.search(this.search)
      .subscribe((data) => 
        {
          if (data)
            this.data = data
          else  
          this._snackBar.open('Empresa não encontrada =(', null, {
            duration: 3000,
          });
        }  ,
      error => {
        this._snackBar.open('Empresa não encontrada =(', null, {
          duration: 3000,
        });
      }
        
      ); 
    } else {
      this.data = {};
    }
      
  }

  editarEmpresa(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        id : this.data.id
        , razaoSocial: this.data.razaoSocial
        , nomeFantasia : this.data.nomeFantasia
        , cnpj : this.data.cnpj
        , ie : this.data.ie
        , eMail : this.data.eMail
        , telefone : this.data.telefone
        , cep : this.data.cep
        , logradouro : this.data.logradouro
        , numero : this.data.numero
        , bairro : this.data.bairro
        , complemento : this.data.complemento
        , cidade : this.data.cidade
        , uf : this.data.uf
        , edicao : true
      }
    })
    .afterClosed().subscribe(result => {
       if (this.data.id) {
          this.search = '';
          this.searchEmpresa();
       }
    });
  }

  excluirEmpresa(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogConfirmationDataExampleDialog, {
      data: {
        id : this.data.id
        , razaoSocial: this.data.razaoSocial
        , nomeFantasia : this.data.nomeFantasia
        , cnpj : this.data.cnpj

      }
    })
    .afterClosed().subscribe(result => {
      if (localStorage.getItem("refresh") == "true" ) {
        this.search = '';
        this.searchEmpresa();
      }
    });
  }

}

@Component({
  selector: 'empresa-dialog',
  templateUrl: 'empresa-dialog.html',
  providers:  [ CadastroService ]
})
export class DialogDataExampleDialog {
  constructor( private dialogRef: MatDialogRef<DialogDataExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData,  private cadastroService : CadastroService, private _snackBar: MatSnackBar) {}


  save() {
    this.cadastroService.save(this.data)
      .subscribe( data =>  {
        // if (data.valido) {
          this.dialogRef.close();
          this._snackBar.open('Empresa salva com sucesso!', null, {
            duration: 3000,
          });
        //}
      } 
      );
    }
}

@Component({
  selector: 'empresa-delete-dialog',
  templateUrl: 'empresa-delete-dialog.html',
  providers:  [ CadastroService ]
})
export class DialogConfirmationDataExampleDialog {
  constructor( private dialogRef: MatDialogRef<DialogConfirmationDataExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData,  private cadastroService : CadastroService, private _snackBar: MatSnackBar) {}
  

  delete() {
    this.cadastroService.delete(this.data.id)
      .subscribe((data) =>  {
          localStorage.setItem("refresh", "true");
          this.dialogRef.close();
          this._snackBar.open('Empresa deletada com sucesso!', null, {
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
