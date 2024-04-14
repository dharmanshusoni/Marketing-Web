import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRoutingModule } from './candidate-routing.module';
import { PermissionManagerService } from 'src/app/component/manager/permission-manager.service';
import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CandidateComponent } from './candidate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CandidateListComponent } from 'src/app/pages/candidate/candidate-list/candidate-list.component';
import { CandidateFormComponent } from 'src/app/pages/candidate/candidate-form/candidate-form.component';

@NgModule({
  declarations: [
    CandidateComponent,
    CandidateListComponent,
    CandidateFormComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
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
  bootstrap: [CandidateComponent]
})

export class CandidateModule { }
