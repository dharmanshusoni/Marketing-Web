import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientCompanyComponent } from 'src/app/pages/client/client-company/client-company.component';
import { ClientFormComponent } from 'src/app/pages/client/client-form/client-form.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
      { path: '',component: ClientCompanyComponent},
      { path: 'client-company',component: ClientCompanyComponent},
      { path: 'client-form',component: ClientFormComponent},
      { path: 'client-form/:companyClientId',component: ClientFormComponent},
      { path: 'client-company/client-form/:companyClientId',component: ClientFormComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
