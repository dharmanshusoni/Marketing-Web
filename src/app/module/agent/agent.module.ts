import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionManagerService } from 'src/app/component/manager/permission-manager.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentComponent } from './agent.component';
import { AgentListComponent } from 'src/app/pages/agent/agent-list/agent-list.component';
import { AgentFormComponent } from 'src/app/pages/agent/agent-form/agent-form.component';

@NgModule({
  declarations: [
    AgentComponent,
    AgentListComponent,
    AgentFormComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
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
  bootstrap: [AgentComponent]
})
export class AgentModule { }
