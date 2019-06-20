import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiberacaoService {

  constructor(private http: HttpClient) { }


  savePessoa(params) {
    params.idEmpresa = 60;
    params.ativo = true;
    if (!params.edicao) 
      return this.http.post('http://appwebcondom.azurewebsites.net/api/0.2/pessoa/adicionar', params);
    if (params.edicao) 
      return this.http.put('http://appwebcondom.azurewebsites.net/api/0.2/pessoa/atualizar', params);
  }

  searchPessoa(documento) {
    return this.http.get('http://appwebcondom.azurewebsites.net/api/0.2/pessoa/buscarPessoaPorDocumento/' + documento);
  }

  deletePessoa(id){
    return this.http.delete('http://appwebcondom.azurewebsites.net/api/0.2/pessoa/remover/' + id);
  }

  criarLiberacao(params) {
    params.idEmpresa = 44;
    params.idPessoa = params.id;
    params.entradaPermanente = false;
    params.idUsuarioLiberacao = 21;
    delete params.id;
      return this.http.post('http://appwebcondom.azurewebsites.net/api/0.2/liberacao/criarLiberacao', params);
  }
}
