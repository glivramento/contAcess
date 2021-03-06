import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { PortariaService } from '../portaria.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-portaria-home',
  templateUrl: './portaria-home.component.html',
  styleUrls: ['../../app.component.css','./portaria-home.component.css']
})
export class PortariaHomeComponent implements OnInit {
  search : string;
  data : any;

  constructor(public dialog: MatDialog, private portariaService : PortariaService, private _snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
     this.data = {};
  }

  back(){
    window.history.back();
  }


  logout(){
    this.authService.logout();
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

// @Component({
//   selector: 'portaria-pendente-dialog',
//   templateUrl: 'liberacao-pendente-dialog.html',
//   providers:  [ PortariaService ]
// })
// export class DialogConfirmationDataPessoaDialog {
//   constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<DialogConfirmationDataPessoaDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData,  private portariaService : LiberacaoService, private _snackBar: MatSnackBar) {}


//   criarLiberacao() {
//     this.liberacaoService.criarLiberacao(this.data)
//       .subscribe((data) =>  {
//           localStorage.setItem("refresh", "true");
//           this.dialogRef.close();
//           this._snackBar.open('Liberação criada com com sucesso!', null, {
//             duration: 3000,
//           });
//       } ,
//       error => {
//         this._snackBar.open('Ocorreu um problema na criação da liberação', null, {
//           duration: 3000,
//         });
//       });
//   }

//}

