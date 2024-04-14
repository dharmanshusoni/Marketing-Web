import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentFormComponent } from 'src/app/pages/agent/agent-form/agent-form.component';
import { AgentListComponent } from 'src/app/pages/agent/agent-list/agent-list.component';
import { AgentComponent } from './agent.component';

const routes: Routes = [
  {
    path: '', component: AgentComponent,
    children: [
      { path: '',component: AgentListComponent},
      { path: 'agent',component: AgentListComponent},
      { path: 'agent-form',component: AgentFormComponent},
      { path: 'agent-form/:agentId',component: AgentFormComponent},
      { path: 'agent/agent-form/:agentId',component: AgentFormComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule { }
