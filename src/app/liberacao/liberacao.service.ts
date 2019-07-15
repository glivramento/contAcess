import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiberacaoService {

  constructor(private http: HttpClient) { }


  savePessoa(params) {
    let funcionario = JSON.parse(localStorage.getItem('funcionario'));
    params.idEmpresa = funcionario.idEmpresa;
    params.ativo = true;
    if (!params.edicao) 
      return this.http.post('https://appwebcondom.azurewebsites.net/api/0.2/pessoa/adicionar', params);
    if (params.edicao) 
      return this.http.put('https://appwebcondom.azurewebsites.net/api/0.2/pessoa/atualizar', params);
  }

  searchPessoa(documento) {
    return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/pessoa/buscarPessoaPorDocumento/' + documento);
  }

  deletePessoa(id){
    return this.http.delete('https://appwebcondom.azurewebsites.net/api/0.2/pessoa/remover/' + id);
  }

  criarLiberacao(params) {
    let funcionario = JSON.parse(localStorage.getItem('funcionario'));
    params.idEmpresa = funcionario.idEmpresa;
    params.idPessoa = params.id;
    params.entradaPermanente = false;
    params.idUsuarioLiberacao = funcionario.id;
    delete params.id;
      return this.http.post('https://appwebcondom.azurewebsites.net/api/0.2/liberacao/criarLiberacao', params);
  }
}
