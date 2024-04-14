import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { candidateDTO } from 'src/app/model/candidate';
import { CandidateService } from 'src/app/Service/candidate.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  candidateList: candidateDTO[];
  busy = false;
  constructor(private clientService: CandidateService,public toastr: ToastrService) {
    this.candidateList = [];
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.clientService.getData().pipe(finalize(() => (this.busy = false))).subscribe(
      (response) => {
        
        if (response.success)
        {  this.candidateList = response.data;
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
}
