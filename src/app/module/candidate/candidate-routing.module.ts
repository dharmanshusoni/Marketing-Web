import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateFormComponent } from 'src/app/pages/candidate/candidate-form/candidate-form.component';
import { CandidateListComponent } from 'src/app/pages/candidate/candidate-list/candidate-list.component';
import { CandidateComponent } from './candidate.component';

const routes: Routes = [
  {
    path: '', component: CandidateComponent,
    children: [
      { path: '',component: CandidateListComponent},
      { path: 'candidate-list',component: CandidateListComponent},
      { path: 'candidate-form',component: CandidateFormComponent},
      { path: 'candidate-form/:candidateId',component: CandidateFormComponent},
      { path: 'candidate/candidate-form/:candidateId',component: CandidateFormComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule { }
