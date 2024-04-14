import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core';
import { candidateDTO } from 'src/app/model/candidate';
import { CompanyClientDTO } from 'src/app/model/company-client';
import { CityDTO, CountryDTO, GenderDTO, LanguageDTO, QualificationDTO, SkillsDTO, StateDTO } from 'src/app/model/master';
import { CandidateService } from 'src/app/Service/candidate.service';
import { MasterService } from 'src/app/Service/master.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent {
  
  countryList: CountryDTO[] = [];
  stateList: StateDTO[] = [];
  cityList: CityDTO[]= [];
  genderList: GenderDTO[]= [];
  languagesList:LanguageDTO[] = [];
  skillsList: SkillsDTO[] = [];
  qualificationList: QualificationDTO[] = [];
  candidateModel = new candidateDTO();
  dropdownSettings = {};
  accessToken = '';
  refreshToken = '';
  busy = false;
  isEdit = false;
  dobDate:any;
  @ViewChild('companyForm', { static: true }) form: any;

  constructor(public datepipe: DatePipe,public authService: AuthService, private masterService: MasterService, private candidateService: CandidateService, public toastr: ToastrService,private route: ActivatedRoute) {
  
  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
    
    this.getCountry(0);
    this.getLanguage(0);
    this.getGender(0);
    this.getQualification(0);
    this.getSkill(0);

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
    const id = this.route.snapshot.paramMap.get('candidateId');
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

  fetch(candidateId:number) {
    this.candidateService.getDataById(candidateId).pipe(finalize(() => (this.busy = false))).subscribe(
      (response) => {
        if (response.success)
        {  
          this.candidateModel = response.data[0];
          this.dobDate = 'DOB : '+this.datepipe.transform(response.data[0].dob, 'dd MMM yyyy');
          
          this.masterService.getCountries().subscribe((couuntries) => {
            this.countryList = couuntries;
            this.candidateModel.country = this.countryList.filter(c => c.id === this.candidateModel.countryId);
            
            this.masterService.getState(this.candidateModel.countryId).subscribe((states) => {
              this.stateList = states;
              this.candidateModel.state = this.stateList.filter(c => c.id === this.candidateModel.stateId);
              
              this.masterService.getCity(this.candidateModel.stateId).subscribe((cities) => {
                this.cityList = cities;
                this.candidateModel.city = this.cityList.filter(c => c.id === this.candidateModel.cityId);

                this.masterService.getGender(this.candidateModel.genderId).subscribe((genders) => {
                  this.genderList = genders;
                  this.candidateModel.gender = this.genderList.filter(c => c.id === this.candidateModel.genderId);

                  this.masterService.getQualification(this.candidateModel.qualificationId).subscribe((qualifications) => {
                    this.qualificationList = qualifications;
                    this.candidateModel.qualifications = this.qualificationList.filter(c => c.id === this.candidateModel.qualificationId);
                    
                    this.masterService.getLanguage(0).subscribe((langulages) => {
                      this.languagesList = langulages;
                      this.candidateModel.languages = this.languagesList.filter((e) => this.candidateModel.languagesIds.split(',').map(Number).includes(e.id));
                      
                      this.masterService.getSkill(0).subscribe((skills) => {
                        this.skillsList = skills;
                        this.candidateModel.skills = this.skillsList.filter((e) => this.candidateModel.skillsIds.split(',').map(Number).includes(e.id));
                        
                      });
                    });
                  });
                });
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
    
    console.log(this.candidateModel);
    if (this.form.valid) {
      this.candidateModel.skillsIds = this.candidateModel.skills.map(function(val) {
        return val.id;
      }).join(',');
      
      this.candidateModel.languagesIds = this.candidateModel.languages.map(function(val) {
        return val.id;
      }).join(',');

      this.candidateModel.qualificationId = this.candidateModel.qualifications[0].id;
      this.candidateModel.genderId = this.candidateModel.gender[0].id;
      this.candidateModel.genderId = this.candidateModel.gender[0].id;
      this.candidateModel.cityId = this.candidateModel.city[0].id;
      this.candidateModel.countryId = this.candidateModel.country[0].id;
      this.candidateModel.stateId = this.candidateModel.state[0].id;
      this.candidateService
        .Save(this.candidateModel)
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

  getCountry(countryId: number) {
    this.masterService.getCountries().subscribe((couuntries) => {
      this.countryList = couuntries;
    });
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

  getLanguage(languageId: number) {
    this.masterService.getLanguage(languageId).subscribe((languages) => {
      this.languagesList = languages;
    });
  }

  getGender(genderId: number) {
    this.masterService.getGender(genderId).subscribe((genders) => {
      this.genderList = genders;
    });
  }

  getQualification(qualificationId: number) {
    this.masterService.getQualification(qualificationId).subscribe((qualifications) => {
      this.qualificationList = qualifications;
    });
  }

  getSkill(skillId: number) {
    this.masterService.getSkill(skillId).subscribe((skills) => {
      this.skillsList = skills;
    });
  }

}
