import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortariaService {

  constructor(private http: HttpClient) { }

  searchQrCode(qrCode) {
    return this.http.get('http://appwebcondom.azurewebsites.net/api/0.2/liberacao/buscarLiberacaoCodigoQrCode/' + qrCode);
  }
  
  liberarAcesso(idUsuario, idLiberacao){
    return this.http.post('http://appwebcondom.azurewebsites.net/api/0.2/liberacao/liberarAcesso/'+ idLiberacao + '/' + idUsuario, {});
  }
}
