import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { PermissionManagerService } from 'src/app/component/manager/permission-manager.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';
import { ClientComponent } from './client.component';
import { ClientCompanyComponent } from 'src/app/pages/client/client-company/client-company.component';
import { ClientFormComponent } from 'src/app/pages/client/client-form/client-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    ClientComponent,
    ClientCompanyComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    PermissionManagerService
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
