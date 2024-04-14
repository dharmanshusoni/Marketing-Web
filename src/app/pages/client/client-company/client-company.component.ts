import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, finalize } from 'rxjs';
import { CompanyClientDTO } from 'src/app/model/company-client';
import { CompanyclientService } from 'src/app/Service/company-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-company',
  templateUrl: './client-company.component.html',
  styleUrls: ['./client-company.component.css']
})
export class ClientCompanyComponent implements OnInit {

  companyClientList: CompanyClientDTO[];
  busy = false;
  constructor(private clientService: CompanyclientService,public toastr: ToastrService) {
    this.companyClientList = [];
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.clientService.getData().pipe(finalize(() => (this.busy = false))).subscribe(
      (response) => {
        
        if (response.success)
        {  this.companyClientList = response.data;
          //console.log(this.companyClientList);
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
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined|| serverPath == null){
      return "assets/Images/default/default_logo.svg";
    }
    return environment.apiUrl+`${serverPath}`;
  }
}
