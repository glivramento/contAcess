import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  save(params) {
    let empresa = JSON.parse(localStorage.getItem('funcionario')).idEmpresa;
    params.idEmpresa = empresa;
    if (!params.edicao) 
      return this.http.post('https://appwebcondom.azurewebsites.net/api/0.2/empresa/adicionar', params);
    if (params.edicao) 
      return this.http.put('https://appwebcondom.azurewebsites.net/api/0.2/empresa/atualizar', params);
  }

  search(cnpj) {
    return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/empresa/buscarEmpresaPorCNPJ/' + cnpj);
  }

  delete(id){
    return this.http.delete('https://appwebcondom.azurewebsites.net/api/0.2/empresa/remover/' + id);
  }

  saveUsuario(params) {
    let empresa = JSON.parse(localStorage.getItem('funcionario')).idEmpresa;
    params.idEmpresa = empresa;
    params.ativo = true;
    if (!params.edicao) 
      return this.http.post('https://appwebcondom.azurewebsites.net/api/0.2/usuario/adicionar', params);
    if (params.edicao) 
      return this.http.put('https://appwebcondom.azurewebsites.net/api/0.2/usuario/atualizar', params);
  }

  searchUsuario(username) {
    return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/usuario/buscarUsuarioLogin/' + username);
  }

  deleteUsuario(id){
    return this.http.delete('https://appwebcondom.azurewebsites.net/api/0.2/usuario/remover/' + id);
  }
}
