import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroHomeComponent } from './cadastro/cadastro-home/cadastro-home.component';
import { PortariaHomeComponent } from './portaria/portaria-home/portaria-home.component';
import { LiberacaoHomeComponent } from './liberacao/liberacao-home/liberacao-home.component';
import { EmpresaComponent } from './cadastro/empresa/empresa.component';
import { UsuarioComponent } from './cadastro/usuario/usuario.component';
import { HistoricoComponent } from './portaria/historico/historico.component';
import { EntradaSemQrcodeComponent } from './portaria/entrada-sem-qrcode/entrada-sem-qrcode.component';
import { AdminGuard } from  './admin/admin.guard';



const routes: Routes = [
   { path: '' , component : LoginComponent   }
  , { path: 'login',  component: LoginComponent }
  , { path: 'home', component : HomeComponent, canActivate: [AdminGuard]   }
  , { path: 'cadastros', component : CadastroHomeComponent, canActivate: [AdminGuard]   }
  , { path: 'portaria', component : PortariaHomeComponent, canActivate: [AdminGuard]   }
  , { path: 'liberacao', component : LiberacaoHomeComponent, canActivate: [AdminGuard]  }
  , { path: 'cadastros/empresas', component : EmpresaComponent, canActivate: [AdminGuard]   }
  , { path: 'cadastros/usuarios', component : UsuarioComponent, canActivate: [AdminGuard]   }
  , { path: 'portaria/historico', component : HistoricoComponent, canActivate: [AdminGuard]   }
  , { path: 'portaria/liberacao-rapida', component : EntradaSemQrcodeComponent, canActivate: [AdminGuard]   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
