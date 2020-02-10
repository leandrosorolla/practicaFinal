import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { LoginComponent } from './componentes/user/login/login.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { RegisterComponent } from './componentes/user/register/register.component';


const routes: Routes = [
  {path: '', component: TablaComponent},

  {path: 'persona/:id', component: ModalComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
