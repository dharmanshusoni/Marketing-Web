import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core';
import { CompanyClientDTO } from 'src/app/model/company-client';
import { CityDTO, CountryDTO, StateDTO } from 'src/app/model/master';
import { MasterService } from 'src/app/Service/master.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyclientService } from 'src/app/Service/company-client.service';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {

  countryList: CountryDTO[];
  stateList: StateDTO[];
  cityList: CityDTO[];
  companyClientModel = new CompanyClientDTO();
  selectedCountries: any;
  selectedStates: any;
  selectedCities: any;
  dropdownSettings = {};
  accessToken = '';
  refreshToken = '';
  busy = false;
  isEdit = false;
  @ViewChild('companyForm', { static: true }) form: any;

  constructor(private http: HttpClient,public authService: AuthService, private masterService: MasterService, private clientService: CompanyclientService, public toastr: ToastrService,private route: ActivatedRoute) {
    this.countryList = [];
    this.stateList = [];
    this.cityList = [];
    //this.companyClientModel.profileImageUrl = this.createImgPath('');
  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
    this.masterService.getCountries().subscribe((couuntries) => {
      this.countryList = couuntries;
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    const id = this.route.snapshot.paramMap.get('companyClientId');
    if(id != null)
    { 
      this.isEdit = true;
      this.fetch(Number(id));
    }
    else{
      this.isEdit = false;
    }
  }

  onItemSelect(item: any, masterType: string) {
    if (masterType == 'country')
      this.getState(item.id);
    if (masterType == 'state')
      this.getCity(item.id);
  }

  getState(countryId: number) {
    this.masterService.getState(countryId).subscribe((states) => {
      this.stateList = states;
    });
  }

  getCity(stateId: number) {
    this.masterService.getCity(stateId).subscribe((cities) => {
      this.cityList = cities;
    });
  }

  fetch(companyClientId:number) {
    this.clientService.getDataById(companyClientId).pipe(finalize(() => (this.busy = false))).subscribe(
      (response) => {
        if (response.success)
        {  
          this.companyClientModel = response.data[0];
          
          this.masterService.getCountries().subscribe((couuntries) => {
            this.countryList = couuntries;
            this.companyClientModel.country = this.countryList.filter(c => c.id === this.companyClientModel.countryId);
            
            this.masterService.getState(this.companyClientModel.countryId).subscribe((states) => {
              this.stateList = states;
              this.companyClientModel.state = this.stateList.filter(c => c.id === this.companyClientModel.stateId);
              
              this.masterService.getCity(this.companyClientModel.stateId).subscribe((cities) => {
                this.cityList = cities;
                this.companyClientModel.city = this.cityList.filter(c => c.id === this.companyClientModel.cityId);
              });
            });
          });

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

  save() {
    if (this.form.valid) {
      this.companyClientModel.cityId = this.companyClientModel.city[0].id;
      this.companyClientModel.countryId = this.companyClientModel.country[0].id;
      this.companyClientModel.stateId = this.companyClientModel.state[0].id;
      this.clientService
        .Save(this.companyClientModel)
        .pipe(finalize(() => (this.busy = false)))
        .subscribe(
          (response) => {
            //console.log(response);
            if(response.success)
            { 
              this.toastr.success('Yoo! '+response.data[0].name+' added', '');
              this.form.reset();
            }
            else{
              this.toastr.warning(response.message+' for '+response.data[0].name, 'Oops!');
            }
          },
          () => {
            this.toastr.error('Oh! we are facing some issue', '');
          }
        );
    }
    else {
      this.toastr.warning('Form Invalid!', '');
    }
  }

  uploadFile(files:any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.clientService.upload(formData,'client','profile',0)
        .pipe(finalize(() => (this.busy = false)))
        .subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Yoo! uploaded', '');  
            this.companyClientModel.profileImageUrl = response.dbPath;
          },
          () => {
            this.toastr.error('Oh! we are facing some issue', '');
          }
        );
  }

  uploadDocument(files:any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.clientService.upload(formData,'client','document',Number(this.route.snapshot.paramMap.get('companyClientId')))
        .pipe(finalize(() => (this.busy = false)))
        .subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Yoo! uploaded', '');
          },
          () => {
            this.toastr.error('Oh! we are facing some issue', '');
          }
        );
  }

  createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return "assets/Images/default/default_logo.svg";//environment.apiUrl+`Resources/default.png`;
    }
    return environment.apiUrl+`${serverPath}`;
  }

}
