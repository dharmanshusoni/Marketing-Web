import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'management',
    loadChildren: () =>
      import('../app/module/management/management.module').then((m) => m.ManagementModule),
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'client',
    loadChildren: () =>
      import('../app/module/client/client.module').then((m) => m.ClientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'candidate',
    loadChildren: () =>
      import('../app/module/candidate/candidate.module').then((m) => m.CandidateModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'agent',
    loadChildren: () =>
      import('../app/module/agent/agent.module').then((m) => m.AgentModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
