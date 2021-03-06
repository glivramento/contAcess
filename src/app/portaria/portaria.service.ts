import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortariaService {

  constructor(private http: HttpClient) { }

  searchQrCode(qrCode) {
    return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/liberacao/buscarLiberacaoCodigoQrCode/' + qrCode);
  }
  
  liberarAcesso(idUsuario, idLiberacao){
    return this.http.post('https://appwebcondom.azurewebsites.net/api/0.2/liberacao/liberarAcesso/'+ idLiberacao + '/' + idUsuario, {});
  }

  listarLiberacoesPendentes(){
    return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/liberacao/buscarLiberacaoPortaria/0');
  }

  listarHistoricoLiberacoes(){
    return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/liberacao/buscarLiberacaoPortaria/1');
  }


}
