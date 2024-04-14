import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AgentDTO } from 'src/app/model/agent';
import { AgentService } from 'src/app/Service/agent.service copy';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  agentList: AgentDTO[];
  busy = false;
  
  constructor(private agentService: AgentService,public toastr: ToastrService) {
    console.log('This is agent list')
    this.agentList = [];
  }

  ngOnInit(): void {
    console.log('This is agent list')
    this.fetch();
  }

  fetch() {
    this.agentService.getData().pipe(finalize(() => (this.busy = false))).subscribe(
      (response) => {
        if (response.success)
        {  this.agentList = response.data;
        }
        else {
          this.toastr.error('Oh! we are facing some issue', '');
        }
      },
      () => {
        this.toastr.error('Oh! we are facing some issue', '');
      }
    );
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return "assets/Images/default/default_logo.svg";
    }
    return environment.apiUrl+`${serverPath}`;
  }
}
