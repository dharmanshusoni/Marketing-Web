import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core';
import { AgentDTO } from 'src/app/model/agent';
import { CountryDTO, StateDTO, CityDTO } from 'src/app/model/master';
import { AgentService } from 'src/app/Service/agent.service copy';
import { MasterService } from 'src/app/Service/master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent {
  countryList: CountryDTO[];
  stateList: StateDTO[];
  cityList: CityDTO[];
  agentTypeList :any;
  agentModel = new AgentDTO();
  selectedCountries: any;
  selectedStates: any;
  selectedCities: any;
  dropdownSettings = {};
  accessToken = '';
  refreshToken = '';
  busy = false;
  isEdit = false;
  public progress: number = 0;
  public message: string = '';
  public imageResponse: { dbPath: ''; } | undefined;

  @ViewChild('AgentForm', { static: true }) form: any;

  constructor(public authService: AuthService, private masterService: MasterService, private agentService: AgentService, public toastr: ToastrService,private route: ActivatedRoute) {
    this.countryList = [];
    this.stateList = [];
    this.cityList = [];
    this.agentTypeList = [];
    //this.agentModel.profileImageUrl = this.createImgPath('');
  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
    this.masterService.getCountries().subscribe((couuntries) => {
      this.countryList = couuntries;
    });

    this.agentTypeList = [{"id":1,"name":"Recruiter"},{"id":2,"name":"Sales Consultant"},{"id":3,"name":"Delivery Team"}];
    this.agentModel.agentType = this.agentTypeList.filter((c:any) => c.id === this.agentModel.agentType);

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    const id = this.route.snapshot.paramMap.get('agentId');
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

  fetch(agentId:number) {
    this.agentService.getDataById(agentId).pipe(finalize(() => (this.busy = false))).subscribe(
      (response) => {
        if (response.success)
        {  
          this.agentModel = response.data[0];
          
          this.masterService.getCountries().subscribe((couuntries) => {
            this.countryList = couuntries;
            this.agentModel.country = this.countryList.filter(c => c.id === this.agentModel.countryId);
            
            this.masterService.getState(this.agentModel.countryId).subscribe((states) => {
              this.stateList = states;
              this.agentModel.state = this.stateList.filter(c => c.id === this.agentModel.stateId);
              
              this.masterService.getCity(this.agentModel.stateId).subscribe((cities) => {
                this.cityList = cities;
                this.agentModel.city = this.cityList.filter(c => c.id === this.agentModel.cityId);
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
      this.agentModel.cityId = this.agentModel.city[0].id;
      this.agentModel.countryId = this.agentModel.country[0].id;
      this.agentModel.stateId = this.agentModel.state[0].id;
      this.agentService
        .Save(this.agentModel)
        .pipe(finalize(() => (this.busy = false)))
        .subscribe(
          (response) => {
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

  public uploadFile(files:any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.agentService.upload(formData)
        .pipe(finalize(() => (this.busy = false)))
        .subscribe(
          (response) => {
            console.log(response);
            this.toastr.success('Yoo! uploaded', '');  
            this.agentModel.profileImageUrl = response.dbPath;
          },
          () => {
            this.toastr.error('Oh! we are facing some issue', '');
          }
        );
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == '' || serverPath == 'undefined' || serverPath == undefined){
      return "assets/Images/default/default_logo.svg";//environment.apiUrl+`Resources/default.png`;
    }
    else
      return environment.apiUrl+`${serverPath}`;
  }
}
